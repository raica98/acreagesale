import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, User, Mail, Phone, Clock, MapPin, DollarSign, Eye, Trash2, Reply } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { SEO } from '../components/SEO';

interface BuyerMessage {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  propertyLocation: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  offerAmount?: number;
  timestamp: string;
  isRead: boolean;
}

export function Inbox() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<BuyerMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<BuyerMessage | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/dashboard', { replace: true });
      return;
    }
    
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Simulate fetching messages from localStorage or API
      const storedMessages = localStorage.getItem(`inbox_${user?.id}`);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } else {
        // Sample messages for demo
        const sampleMessages: BuyerMessage[] = [
          {
            id: '1',
            propertyId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            propertyTitle: 'Prime Development Land',
            propertyPrice: 45000,
            propertyLocation: 'Charlotte, North Carolina',
            buyerName: 'John Smith',
            buyerEmail: 'john.smith@email.com',
            buyerPhone: '(555) 123-4567',
            message: "Hi! I'm very interested in your 2.5-acre property in Charlotte. I've been looking for development land in this area for months. Could we schedule a call to discuss the details? I'm a serious buyer with financing already in place.",
            offerAmount: 42000,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            isRead: false
          },
          {
            id: '2',
            propertyId: 'b1fccb00-0d1c-4ff9-a0d0-7cc0cd491b22',
            propertyTitle: 'Scenic Mountain Property',
            propertyPrice: 78000,
            propertyLocation: 'Denver, Colorado',
            buyerName: 'Sarah Johnson',
            buyerEmail: 'sarah.j@email.com',
            buyerPhone: '(555) 987-6543',
            message: "Hello! I represent a group of investors interested in your mountain property. We're looking for recreational land for our portfolio. Would you be open to discussing terms?",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            isRead: true
          },
          {
            id: '3',
            propertyId: 'c2gddc11-1e2d-4gg0-b1e1-8dd1de502c33',
            propertyTitle: 'Waterfront Investment Land',
            propertyPrice: 125000,
            propertyLocation: 'Austin, Texas',
            buyerName: 'Mike Davis',
            buyerEmail: 'mike.davis@email.com',
            buyerPhone: '(555) 456-7890',
            message: "I'm interested in your waterfront property. Can you provide more details about water access and any restrictions? I'm looking to build a vacation home.",
            offerAmount: 120000,
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            isRead: false
          }
        ];
        setMessages(sampleMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return messageTime.toLocaleDateString();
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  if (loading) {
    <SEO slug="inbox" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16 lg:pt-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 lg:py-6 gap-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm lg:text-lg">AS</span>
                </div>
                <span className="text-base lg:text-xl font-bold text-gray-900">Acreage Sale</span>
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link to="/properties" className="text-gray-500 hover:text-gray-900">Properties</Link>
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</Link>
              <span className="text-blue-600 font-medium">Inbox</span>
            </nav>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
                <span className="lg:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                Buyer Messages
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="mt-2 text-sm lg:text-base text-gray-600">Messages from potential buyers interested in your properties</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Messages List */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Messages ({messages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-500">Buyer inquiries will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                        } ${!message.isRead ? 'bg-blue-50/30' : ''}`}
                        onClick={() => {
                          setSelectedMessage(message);
                          markAsRead(message.id);
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{message.buyerName}</h3>
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{formatTimeAgo(message.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{message.propertyTitle}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                        {message.offerAmount && (
                          <div className="mt-2">
                            <Badge className="bg-green-100 text-green-800">
                              Offer: ${message.offerAmount.toLocaleString()}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="w-full lg:w-2/3">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Message Details
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Property Inquiry</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Property:</span>
                        <p className="font-medium">{selectedMessage.propertyTitle}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Location:</span>
                        <p className="font-medium">{selectedMessage.propertyLocation}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Listed Price:</span>
                        <p className="font-medium text-green-600">${selectedMessage.propertyPrice.toLocaleString()}</p>
                      </div>
                      {selectedMessage.offerAmount && (
                        <div>
                          <span className="text-sm text-gray-600">Buyer's Offer:</span>
                          <p className="font-medium text-blue-600">${selectedMessage.offerAmount.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buyer Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Buyer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Name:</span>
                          <p className="font-medium">{selectedMessage.buyerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Email:</span>
                          <p className="font-medium">
                            <a href={`mailto:${selectedMessage.buyerEmail}`} className="text-blue-600 hover:underline">
                              {selectedMessage.buyerEmail}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Phone:</span>
                          <p className="font-medium">
                            <a href={`tel:${selectedMessage.buyerPhone}`} className="text-blue-600 hover:underline">
                              {selectedMessage.buyerPhone}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Received:</span>
                          <p className="font-medium">{new Date(selectedMessage.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Message</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <a
                      href={`mailto:${selectedMessage.buyerEmail}?subject=Re: ${selectedMessage.propertyTitle}&body=Hi ${selectedMessage.buyerName},%0D%0A%0D%0AThank you for your interest in my property "${selectedMessage.propertyTitle}".%0D%0A%0D%0A`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </Button>
                    </a>
                    <a
                      href={`tel:${selectedMessage.buyerPhone}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Buyer
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                    <p className="text-gray-500">Choose a message from the list to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}