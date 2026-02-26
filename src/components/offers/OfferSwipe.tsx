import React, { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Heart, MessageCircle, Clock, User, Send } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface DatabaseOffer {
  id: string;
  property_id: string;
  owner_id: string;
  buyer: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  amount: string;
  offer_amount: number;
  ready: string;
  timeline?: string;
  status: string;
  created_at: string;
}

interface OfferSwipeProps {
  propertyId: string;
  sellerId: string;
  onOfferProcessed?: (offerId: string, accepted: boolean) => void;
}

const OfferSwipe: React.FC<OfferSwipeProps> = ({ propertyId, sellerId, onOfferProcessed }) => {
  const [offers, setOffers] = useState<DatabaseOffer[]>([]);
  const [count, setCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [propertyInfo, setPropertyInfo] = useState<{ title: string; apn: string } | null>(null);
  const [showCounterForm, setShowCounterForm] = useState<string | null>(null);
  const [counterAmount, setCounterAmount] = useState<string>('');
  const [counterMessage, setCounterMessage] = useState<string>('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Fetch real offers from database
  useEffect(() => {
    fetchOffers();
    fetchPropertyInfo();
  }, [sellerId]);

  const fetchPropertyInfo = async () => {
    try {
      // Handle demo property ID
      if (propertyId === 'demo') {
        setPropertyInfo({ title: 'Demo Property', apn: 'DEMO-APN' });
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select('title, apn')
        .eq('id', propertyId)
        .single();

      if (error) {
        console.error('Error fetching property info:', error);
        return;
      }

      setPropertyInfo(data);
    } catch (error) {
      console.error('Error in fetchPropertyInfo:', error);
    }
  };
  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      // Fetch pending offers for this seller
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('owner_id', sellerId)
        .eq('status', 'Pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching offers:', error);
        // Fallback to demo data if database fetch fails
        setOffers([
          { 
            id: "demo-1", 
            property_id: propertyId,
            owner_id: sellerId,
            buyer: "John Doe",
            buyer_name: "John Doe", 
            buyer_email: "john.doe@email.com",
            buyer_phone: "(555) 123-4567",
            amount: "$120,000",
            offer_amount: 120000,
            ready: "30 days",
            timeline: "Cash ready, flexible closing",
            status: "Pending",
            created_at: new Date().toISOString()
          },
          { 
            id: "demo-2", 
            property_id: propertyId,
            owner_id: sellerId,
            buyer: "Mary Smith",
            buyer_name: "Mary Smith", 
            buyer_email: "mary.smith@email.com",
            buyer_phone: "(555) 987-6543",
            amount: "$135,000",
            offer_amount: 135000,
            ready: "Cash, 14 days",
            timeline: "All cash offer, quick close",
            status: "Pending",
            created_at: new Date().toISOString()
          },
          { 
            id: "demo-3", 
            property_id: propertyId,
            owner_id: sellerId,
            buyer: "Mike Johnson",
            buyer_name: "Mike Johnson", 
            buyer_email: "mike.johnson@email.com",
            buyer_phone: "(555) 456-7890",
            amount: "$125,500",
            offer_amount: 125500,
            ready: "45 days",
            timeline: "Financing approved, standard terms",
            status: "Pending",
            created_at: new Date().toISOString()
          },
        ]);
        return;
      }

      // Transform database offers to component format
      const transformedOffers = data.map(offer => ({
        id: offer.id,
        property_id: offer.property_id,
        owner_id: offer.owner_id,
        buyer: offer.buyer_name,
        buyer_name: offer.buyer_name,
        buyer_email: offer.buyer_email,
        buyer_phone: offer.buyer_phone,
        amount: `$${offer.offer_amount.toLocaleString()}`,
        offer_amount: offer.offer_amount,
        ready: offer.timeline || "Standard terms",
        timeline: offer.timeline,
        status: offer.status,
        created_at: offer.created_at
      }));

      setOffers(transformedOffers);
    } catch (error) {
      console.error('Error in fetchOffers:', error);
      // Fallback to demo data
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };
  // Send email notification to buyer
  const sendEmailNotification = async (offer: DatabaseOffer, decision: 'accepted' | 'declined' | 'counter', counterData?: { amount: number; message: string }) => {
    try {
      setSendingEmail(true);
      
      const emailData = {
        to: offer.buyer_email,
        buyerName: offer.buyer_name,
        propertyTitle: propertyInfo?.title || 'Property',
        propertyApn: propertyInfo?.apn || 'N/A',
        originalOffer: offer.offer_amount,
        decision,
        counterOffer: counterData?.amount,
        counterMessage: counterData?.message,
        sellerContact: 'info@acreagesales.com' // You can make this dynamic
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-offer-decision-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Don't block the UI for email failures
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSwipe = async (offer: DatabaseOffer, accepted: boolean) => {
    setProcessing(true);
    
    try {
      // Update offer status in database
      const { error } = await supabase
        .from('offers')
        .update({ status: accepted ? 'Accepted' : 'Declined' })
        .eq('id', offer.id)
        .eq('owner_id', sellerId);

      if (error) {
        console.error('Error updating offer status:', error);
        alert('Failed to update offer. Please try again.');
        setProcessing(false);
        return;
      }

      // Send email notification to buyer
      await sendEmailNotification(offer, accepted ? 'accepted' : 'declined');

      // Remove from local state
      setOffers((prev) => prev.filter((o) => o.id !== offer.id));
      setCount((c) => c + 1);

      // Call the callback if provided
      if (onOfferProcessed) {
        onOfferProcessed(offer.id, accepted);
      }
    } catch (error) {
      console.error('Error in handleSwipe:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCounterOffer = async (offer: DatabaseOffer) => {
    if (!counterAmount || isNaN(parseFloat(counterAmount))) {
      alert('Please enter a valid counter offer amount');
      return;
    }

    setProcessing(true);
    
    try {
      // Update offer status in database
      const { error } = await supabase
        .from('offers')
        .update({ 
          status: 'Counter Offered',
          // You might want to add counter_amount and counter_message fields to your offers table
        })
        .eq('id', offer.id)
        .eq('owner_id', sellerId);

      if (error) {
        console.error('Error updating offer status:', error);
        alert('Failed to submit counter offer. Please try again.');
        setProcessing(false);
        return;
      }

      // Send email notification to buyer with counter offer
      await sendEmailNotification(offer, 'counter', {
        amount: parseFloat(counterAmount),
        message: counterMessage || `We appreciate your offer of $${offer.offer_amount.toLocaleString()}. We would like to counter with $${parseFloat(counterAmount).toLocaleString()}.`
      });

      // Remove from local state
      setOffers((prev) => prev.filter((o) => o.id !== offer.id));
      setCount((c) => c + 1);
      
      // Reset counter form
      setShowCounterForm(null);
      setCounterAmount('');
      setCounterMessage('');

      // Call the callback if provided
      if (onOfferProcessed) {
        onOfferProcessed(offer.id, false); // Counter is not acceptance
      }
    } catch (error) {
      console.error('Error in handleCounterOffer:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-[#329cf9]/10 to-purple-100 rounded-3xl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#329cf9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Offers...</h3>
          <p className="text-gray-600">Fetching your latest offers</p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-[#329cf9]/10 to-purple-100 rounded-3xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#329cf9] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All Offers Reviewed! 🎉</h3>
          <p className="text-gray-600 mb-2">You've processed {count} offers</p>
          <p className="text-sm text-gray-500">New offers will appear here automatically</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-[#329cf9]/5 to-purple-50 rounded-3xl p-8">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">Swipe right to accept • Swipe left to decline • Swipe up to counter</p>
        <p className="text-sm text-gray-500 mb-2">Showing {offers.length} pending offers</p>
        <div className="inline-flex items-center bg-[#329cf9]/10 text-[#329cf9] px-4 py-2 rounded-full font-semibold text-sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Reviewed: {count} offers
        </div>
      </div>

      <div className="relative w-80 h-[450px] mb-8">
        <AnimatePresence>
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="absolute w-full h-full bg-white rounded-3xl shadow-2xl flex flex-col justify-between p-8 border border-gray-100"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              whileDrag={{ 
                scale: 1.05,
                rotate: Math.random() * 10 - 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) handleSwipe(offer, true);
                if (info.offset.x < -100) handleSwipe(offer, false);
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ 
                opacity: index === 0 ? 1 : 0.7, 
                scale: index === 0 ? 1 : 0.95,
                y: index * 10
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                x: (info) => info.offset.x > 0 ? 300 : -300,
                rotate: (info) => info.offset.x > 0 ? 30 : -30
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ zIndex: offers.length - index }}
            >
              {/* Swipe Indicators */}
              <motion.div 
                className="absolute top-4 left-4 bg-gray-600 text-white px-4 py-2 rounded-full text-lg font-bold opacity-0 shadow-lg flex items-center gap-2"
                animate={{ opacity: 0 }}
                whileDrag={{ opacity: 1 }}
              >
                <span className="text-xl">😢</span>
                <span>DECLINE</span>
              </motion.div>
              <motion.div 
                className="absolute top-4 right-4 bg-[#329cf9] text-white px-4 py-2 rounded-full text-lg font-bold opacity-0 shadow-lg flex items-center gap-2"
                animate={{ opacity: 0 }}
                whileDrag={{ opacity: 1 }}
              >
                <span className="text-xl">😊</span>
                <span>ACCEPT</span>
              </motion.div>
              
              {/* Counter Swipe Indicator */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#329cf9] text-white px-4 py-2 rounded-full text-lg font-bold opacity-0 shadow-lg flex items-center gap-2"
                animate={{ opacity: 0 }}
                whileDrag={{ opacity: 1 }}
              >
                <span className="text-xl">↑</span>
                <span>COUNTER</span>
              </motion.div>

              {/* Offer Content */}
              <div className="text-center">
                {/* Property APN at the top */}
                <div className="mb-6">
                  <div className="inline-flex items-center bg-[#329cf9]/10 text-[#329cf9] px-4 py-2 rounded-full font-bold text-sm border border-[#329cf9]/30">
                    APN: {propertyInfo?.apn || 'Loading...'}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.buyer_name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-green-600">${offer.offer_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-[#329cf9]" />
                    <span className="text-lg text-gray-700">{offer.ready}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">📧 {offer.buyer_email}</p>
                    <p className="text-sm text-gray-500">📞 {offer.buyer_phone}</p>
                  </div>
                  {offer.timeline && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      {offer.timeline}
                    </p>
                  )}
                </div>
              </div>
                {/* Counter Offer Form */}
                {showCounterForm === offer.id && (
                  <div className="space-y-4 p-4 bg-orange-50 rounded-xl border border-orange-200 mb-4">
                    <h4 className="font-bold text-orange-800 text-center">Submit Counter Offer</h4>
                    <div>
                      <label className="block text-sm font-medium text-orange-700 mb-2">
                        Counter Offer Amount ($)
                      </label>
                      <input
                        type="number"
                        value={counterAmount}
                        onChange={(e) => setCounterAmount(e.target.value)}
                        placeholder="Enter your counter offer"
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        value={counterMessage}
                        onChange={(e) => setCounterMessage(e.target.value)}
                        placeholder="Add a personal message..."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-20"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCounterOffer(offer)}
                        disabled={processing || sendingEmail}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        {processing || sendingEmail ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        Send Counter
                      </button>
                      <button
                        onClick={() => {
                          setShowCounterForm(null);
                          setCounterAmount('');
                          setCounterMessage('');
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {showCounterForm !== offer.id && (
                  <div className="space-y-4">
                    {/* All Three Buttons in One Row */}
                    <div className="flex gap-2 items-center">
                    {/* Decline Button */}
                    <button
                      onClick={() => handleSwipe(offer, false)}
                      className="group relative flex-1 px-3 py-3 rounded-xl bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 hover:border-red-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-sm overflow-hidden"
                      disabled={processing || sendingEmail}
                    >
                      {/* Button content */}
                      <div className="relative z-10">
                        <div className="flex flex-col items-center">
                          <span className="text-lg mb-1">😢</span>
                          <span className="text-xs font-black tracking-wider">DECLINE</span>
                        </div>
                      </div>
                    </button>
                    
                    {/* Counter Button - Middle */}
                    <button
                      onClick={() => {
                        setShowCounterForm(offer.id);
                        setCounterAmount(offer.offer_amount.toString());
                      }}
                      className="group relative flex-1 px-3 py-3 rounded-xl bg-[#329cf9] hover:bg-[#329cf9]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-sm overflow-hidden"
                      disabled={processing || sendingEmail}
                    >
                      {/* Button content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-lg mb-1">💰</span>
                        <span className="text-xs font-black tracking-wider">COUNTER</span>
                      </div>
                    </button>

                    {/* Accept Button */}
                    <button
                      onClick={() => handleSwipe(offer, true)}
                      className="group relative flex-1 px-3 py-3 rounded-xl bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 hover:border-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-sm overflow-hidden"
                      disabled={processing || sendingEmail}
                    >
                      {/* Button content */}
                      <div className="relative z-10">
                        <div className="flex flex-col items-center">
                          <span className="text-lg mb-1">😊</span>
                          <span className="text-xs font-black tracking-wider">ACCEPT</span>
                        </div>
                      </div>
                    </button>
                    </div>
                  </div>
                )}

                {/* Email sending indicator */}
                {sendingEmail && (
                  <div className="text-center py-2">
                    <div className="inline-flex items-center gap-2 text-blue-600 text-sm">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Sending email notification...
                    </div>
                  </div>
                )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Background Cards Preview */}
        {offers.length > 1 && (
          <div className="absolute inset-0 -z-10">
            {offers.slice(1, 3).map((_, index) => (
              <div
                key={index}
                className="absolute w-full h-full bg-white/50 rounded-3xl"
                style={{
                  transform: `translateY(${(index + 1) * 8}px) scale(${1 - (index + 1) * 0.02})`,
                  zIndex: -(index + 1)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Swipe Instructions */}
      <div className="text-center">
      </div>
    </div>
  );
};

export default OfferSwipe;