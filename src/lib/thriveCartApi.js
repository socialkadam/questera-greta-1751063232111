// ThriveCart Learn Plus API Integration
import { supabase } from './supabase';

export class ThriveCartAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_THRIVECART_API_URL || 'https://api.thrivecart.com/v1';
    this.apiKey = import.meta.env.VITE_THRIVECART_API_KEY;
    this.learnPlusUrl = import.meta.env.VITE_THRIVECART_LEARN_PLUS_URL;
  }

  // Generate checkout URL for ThriveCart product
  async generateCheckoutUrl(productId, customFields = {}) {
    try {
      const checkoutData = {
        product_id: productId,
        custom_fields: {
          user_id: customFields.userId,
          email: customFields.email,
          name: customFields.name,
          archetype: customFields.archetype,
          redirect_url: `${window.location.origin}/academy/enrollment-success`,
          ...customFields
        }
      };

      // In production, this would make an API call to ThriveCart
      // For now, return a constructed URL
      const params = new URLSearchParams({
        product: productId,
        ...checkoutData.custom_fields
      });

      return `${this.learnPlusUrl}/checkout/${productId}?${params.toString()}`;
    } catch (error) {
      console.error('Error generating checkout URL:', error);
      throw error;
    }
  }

  // Get student enrollment status
  async getStudentEnrollment(userId, productId) {
    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          thrivecart_products (*)
        `)
        .eq('user_id', userId)
        .eq('thrivecart_product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching enrollment:', error);
      return null;
    }
  }

  // Get student progress for a course
  async getStudentProgress(userId, enrollmentId) {
    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('enrollment_id', enrollmentId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  }

  // Get all available courses
  async getAvailableCourses(archetype = null) {
    try {
      let query = supabase
        .from('thrivecart_products')
        .select('*')
        .eq('is_active', true);

      if (archetype) {
        query = query.eq('archetype', archetype);
      }

      const { data, error } = await query.order('product_name');

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Process webhook from ThriveCart
  async processWebhook(webhookData) {
    try {
      console.log('Processing ThriveCart webhook:', webhookData);

      // Log the webhook
      const { error: logError } = await supabase
        .from('thrivecart_webhook_logs')
        .insert({
          webhook_type: webhookData.event_type,
          event_data: webhookData,
          user_id: webhookData.custom_fields?.user_id,
          transaction_id: webhookData.transaction_id
        });

      if (logError) {
        console.error('Error logging webhook:', logError);
      }

      switch (webhookData.event_type) {
        case 'purchase_completed':
          await this.handlePurchaseCompleted(webhookData);
          break;
        case 'refund_processed':
          await this.handleRefundProcessed(webhookData);
          break;
        case 'course_progress_updated':
          await this.handleProgressUpdate(webhookData);
          break;
        case 'course_completed':
          await this.handleCourseCompleted(webhookData);
          break;
        default:
          console.log('Unhandled webhook type:', webhookData.event_type);
      }

      // Mark webhook as processed
      await supabase
        .from('thrivecart_webhook_logs')
        .update({ 
          processed: true, 
          processed_at: new Date().toISOString() 
        })
        .eq('transaction_id', webhookData.transaction_id);

    } catch (error) {
      console.error('Error processing webhook:', error);
      
      // Log the error
      await supabase
        .from('thrivecart_webhook_logs')
        .update({ 
          error_message: error.message,
          processed_at: new Date().toISOString()
        })
        .eq('transaction_id', webhookData.transaction_id);
      
      throw error;
    }
  }

  // Handle successful purchase
  async handlePurchaseCompleted(webhookData) {
    const {
      transaction_id,
      product_id,
      customer_email,
      customer_name,
      amount,
      currency,
      custom_fields,
      student_id,
      learn_plus_access_url
    } = webhookData;

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('thrivecart_transactions')
      .insert({
        thrivecart_transaction_id: transaction_id,
        thrivecart_product_id: product_id,
        user_id: custom_fields?.user_id,
        customer_email,
        customer_name,
        amount: parseFloat(amount),
        currency,
        status: 'completed',
        transaction_date: new Date().toISOString(),
        webhook_data: webhookData
      });

    if (transactionError) {
      throw transactionError;
    }

    // Create enrollment record
    const { error: enrollmentError } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: custom_fields?.user_id,
        thrivecart_product_id: product_id,
        thrivecart_transaction_id: transaction_id,
        thrivecart_student_id: student_id,
        learn_plus_access_url,
        status: 'active'
      });

    if (enrollmentError) {
      throw enrollmentError;
    }

    // Update wizard status if this is academy enrollment
    if (custom_fields?.archetype && custom_fields?.user_id) {
      await supabase
        .from('wizards')
        .update({ 
          academy_enrolled: true,
          status: 'pending'
        })
        .eq('id', custom_fields.user_id);
    }

    console.log('Purchase processed successfully:', transaction_id);
  }

  // Handle refund
  async handleRefundProcessed(webhookData) {
    const { transaction_id, refund_amount } = webhookData;

    // Update transaction
    await supabase
      .from('thrivecart_transactions')
      .update({
        status: 'refunded',
        refund_date: new Date().toISOString(),
        refund_amount: parseFloat(refund_amount)
      })
      .eq('thrivecart_transaction_id', transaction_id);

    // Suspend enrollment
    await supabase
      .from('course_enrollments')
      .update({ status: 'suspended' })
      .eq('thrivecart_transaction_id', transaction_id);

    console.log('Refund processed:', transaction_id);
  }

  // Handle progress update
  async handleProgressUpdate(webhookData) {
    const {
      student_id,
      lesson_id,
      lesson_name,
      module_id,
      module_name,
      completed,
      time_spent,
      quiz_score,
      progress_percentage
    } = webhookData;

    // Find enrollment
    const { data: enrollment } = await supabase
      .from('course_enrollments')
      .select('id, user_id')
      .eq('thrivecart_student_id', student_id)
      .single();

    if (!enrollment) {
      throw new Error('Enrollment not found for student:', student_id);
    }

    // Upsert progress record
    await supabase
      .from('course_progress')
      .upsert({
        enrollment_id: enrollment.id,
        user_id: enrollment.user_id,
        lesson_id,
        lesson_name,
        module_id,
        module_name,
        completed: completed || false,
        completion_date: completed ? new Date().toISOString() : null,
        time_spent_seconds: time_spent || 0,
        quiz_score: quiz_score || null,
        progress_data: webhookData
      });

    // Update overall enrollment progress
    if (progress_percentage !== undefined) {
      await supabase
        .from('course_enrollments')
        .update({
          progress_percentage: Math.round(progress_percentage),
          last_accessed: new Date().toISOString()
        })
        .eq('id', enrollment.id);
    }

    console.log('Progress updated for student:', student_id);
  }

  // Handle course completion
  async handleCourseCompleted(webhookData) {
    const {
      student_id,
      certificate_url,
      completion_date
    } = webhookData;

    // Find enrollment
    const { data: enrollment } = await supabase
      .from('course_enrollments')
      .select('id, user_id, thrivecart_product_id')
      .eq('thrivecart_student_id', student_id)
      .single();

    if (!enrollment) {
      throw new Error('Enrollment not found for student:', student_id);
    }

    // Update enrollment as completed
    await supabase
      .from('course_enrollments')
      .update({
        status: 'completed',
        completion_date: completion_date || new Date().toISOString(),
        progress_percentage: 100,
        certificate_issued: true,
        certificate_url
      })
      .eq('id', enrollment.id);

    // Check if this is academy completion - update wizard status
    const { data: product } = await supabase
      .from('thrivecart_products')
      .select('product_type, archetype')
      .eq('thrivecart_product_id', enrollment.thrivecart_product_id)
      .single();

    if (product?.product_type === 'academy_course') {
      await supabase
        .from('wizards')
        .update({
          status: 'approved',
          certification_completed_at: new Date().toISOString(),
          certification_course_id: enrollment.thrivecart_product_id,
          badge: `Certified ${product.archetype?.charAt(0).toUpperCase() + product.archetype?.slice(1)}`
        })
        .eq('id', enrollment.user_id);
    }

    console.log('Course completed for student:', student_id);
  }
}

// Helper functions for React components
export const thriveCartHelpers = {
  // Get checkout URL for academy enrollment
  async getAcademyCheckoutUrl(user, archetype) {
    const api = new ThriveCartAPI();
    const productId = `tc_academy_${archetype}`;
    
    return await api.generateCheckoutUrl(productId, {
      userId: user.id,
      email: user.email,
      name: user.full_name,
      archetype
    });
  },

  // Check if user has active academy enrollment
  async hasActiveEnrollment(userId, archetype) {
    const api = new ThriveCartAPI();
    const productId = `tc_academy_${archetype}`;
    const enrollment = await api.getStudentEnrollment(userId, productId);
    
    return enrollment && enrollment.status === 'active';
  },

  // Get user's course progress
  async getUserProgress(userId, productId) {
    const api = new ThriveCartAPI();
    const enrollment = await api.getStudentEnrollment(userId, productId);
    
    if (!enrollment) return null;
    
    const progress = await api.getStudentProgress(userId, enrollment.id);
    
    return {
      enrollment,
      progress,
      completionPercentage: enrollment.progress_percentage || 0,
      certificateUrl: enrollment.certificate_url,
      accessUrl: enrollment.learn_plus_access_url
    };
  }
};

export default ThriveCartAPI;