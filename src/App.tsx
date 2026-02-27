import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from './lib/supabase';
import { Homepage } from './screens/Homepage/Homepage';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { Dashboard } from './pages/Dashboard';
import { EditProperty } from './pages/EditProperty';
import { DashboardEditListing } from './pages/DashboardEditListing';
import { DashboardInbox } from './pages/DashboardInbox';
import { Inbox } from './pages/Inbox';
import { SellMyLandFast } from './pages/SellMyLandFast';
import { SellLandFast } from './pages/SellLandFast';
import { SellLandFastAlabama } from './pages/SellLandFastAlabama';
import { SellLandFastAlaska } from './pages/SellLandFastAlaska';
import { SellLandFastArizona } from './pages/SellLandFastArizona';
import { SellLandFastArkansas } from './pages/SellLandFastArkansas';
import { SellLandFastCalifornia } from './pages/SellLandFastCalifornia';
import { SellLandFastDelaware } from './pages/SellLandFastDelaware';
import { SellLandFastFlorida } from './pages/SellLandFastFlorida';
import { SellLandFastGeorgia } from './pages/SellLandFastGeorgia';
import { SellLandFastIdaho } from './pages/SellLandFastIdaho';
import { SellLandFastIllinois } from './pages/SellLandFastIllinois';
import { SellLandFastIndiana } from './pages/SellLandFastIndiana';
import { SellLandFastIowa } from './pages/SellLandFastIowa';
import { SellLandFastKansas } from './pages/SellLandFastKansas';
import { SellLandFastKentucky } from './pages/SellLandFastKentucky';
import { SellLandFastLouisiana } from './pages/SellLandFastLouisiana';
import { SellLandFastMaine } from './pages/SellLandFastMaine';
import { SellLandFastMaryland } from './pages/SellLandFastMaryland';
import { SellLandFastMassachusetts } from './pages/SellLandFastMassachusetts';
import { SellLandFastMichigan } from './pages/SellLandFastMichigan';
import { SellLandFastMinnesota } from './pages/SellLandFastMinnesota';
import { SellLandFastMississippi } from './pages/SellLandFastMississippi';
import { SellLandFastMissouri } from './pages/SellLandFastMissouri';
import { SellLandFastMontana } from './pages/SellLandFastMontana';
import { SellLandFastNebraska } from './pages/SellLandFastNebraska';
import { SellLandFastNevada } from './pages/SellLandFastNevada';
import { SellLandFastNewHampshire } from './pages/SellLandFastNewHampshire';
import { SellLandFastNewJersey } from './pages/SellLandFastNewJersey';
import { SellLandFastNewMexico } from './pages/SellLandFastNewMexico';
import { SellLandFastNewYork } from './pages/SellLandFastNewYork';
import { SellLandFastNorthCarolina } from './pages/SellLandFastNorthCarolina';
import { SellLandFastNorthDakota } from './pages/SellLandFastNorthDakota';
import { SellLandFastOhio } from './pages/SellLandFastOhio';
import { SellLandFastOklahoma } from './pages/SellLandFastOklahoma';
import { SellLandFastOregon } from './pages/SellLandFastOregon';
import { SellLandFastPennsylvania } from './pages/SellLandFastPennsylvania';
import { SellLandFastRhodeIsland } from './pages/SellLandFastRhodeIsland';
import { SellLandFastSouthCarolina } from './pages/SellLandFastSouthCarolina';
import { SellLandFastSouthDakota } from './pages/SellLandFastSouthDakota';
import { SellLandFastTennessee } from './pages/SellLandFastTennessee';
import { SellLandFastTexas } from './pages/SellLandFastTexas';
import { SellLandFastUtah } from './pages/SellLandFastUtah';
import { SellLandFastVermont } from './pages/SellLandFastVermont';
import { SellLandFastVirginia } from './pages/SellLandFastVirginia';
import { SellLandFastWashington } from './pages/SellLandFastWashington';
import { SellLandFastWisconsin } from './pages/SellLandFastWisconsin';
import { SellLandFastWyoming } from './pages/SellLandFastWyoming';
import { SellLandFastColorado } from './pages/SellLandFastColorado';
import { SellLandFastConnecticut } from './pages/SellLandFastConnecticut';
import { NotFound } from './pages/NotFound';
import { AddListing } from './pages/AddListing';
import { About } from './pages/About';
import { AdvancedSearch } from './pages/AdvancedSearch';
import { Contact } from './pages/Contact';
import { Agent } from './pages/Agent';
import { ContactUs3 } from './pages/ContactUs3';
import { FavoriteProperties } from './pages/FavoriteProperties';
import { Stats } from './pages/Stats';
import { SubmitProperty } from './pages/SubmitProperty';
import { UserDashboardMain } from './pages/UserDashboardMain';
import { Homepage as HomepageSEO } from './pages/Homepage';
import { LandForSaleInDallas } from './pages/LandForSaleInDallas';
import { LandForSaleInFlorida } from './pages/LandForSaleInFlorida';
import { LandForSaleInDelaware } from './pages/LandForSaleInDelaware';
import { LandForSaleInIndiana } from './pages/LandForSaleInIndiana';
import { LandForSaleInHouston } from './pages/LandForSaleInHouston';
import { LandForSaleInIowa } from './pages/LandForSaleInIowa';
import { LandForSaleInJacksonville } from './pages/LandForSaleInJacksonville';
import { LandForSaleInJamaica } from './pages/LandForSaleInJamaica';
import { LandForSaleInJoshuaTree } from './pages/LandForSaleInJoshuaTree';
import { LandForSaleInKansas } from './pages/LandForSaleInKansas';
import { LandForSaleInKnoxville } from './pages/LandForSaleInKnoxville';
import { LandForSaleInLosAngeles } from './pages/LandForSaleInLosAngeles';
import { LandForSaleInLouisiana } from './pages/LandForSaleInLouisiana';
import { LandForSaleInMaryland } from './pages/LandForSaleInMaryland';
import { LandForSaleInNewHampshire } from './pages/LandForSaleInNewHampshire';
import { LandForSaleInNewJersey } from './pages/LandForSaleInNewJersey';
import { LandForSaleInNewMexico } from './pages/LandForSaleInNewMexico';
import { LandForSaleInNewMexicoHyphenated } from './pages/LandForSaleInNewMexicoHyphenated';
import { LandForSaleInPennsylvania } from './pages/LandForSaleInPennsylvania';
import { LandForSaleInPhelan } from './pages/LandForSaleInPhelan';
import { LandForSaleInSacramento } from './pages/LandForSaleInSacramento';
import { LandForSaleInSouthCarolina } from './pages/LandForSaleInSouthCarolina';
import { LandForSaleInSanAntonio } from './pages/LandForSaleInSanAntonio';
import { LandForSaleInSouthDakota } from './pages/LandForSaleInSouthDakota';
import { LandForSaleInTemecula } from './pages/LandForSaleInTemecula';
import { LandForSaleInUtah } from './pages/LandForSaleInUtah';
import { LandForSaleInVermont } from './pages/LandForSaleInVermont';
import { LandForSaleInVirginia } from './pages/LandForSaleInVirginia';
import { LandForSaleInWashington } from './pages/LandForSaleInWashington';
import { LandInPhelan } from './pages/LandInPhelan';
import { Phelan2 } from './pages/Phelan2';
import { PhelanCaLandForSale } from './pages/PhelanCaLandForSale';
import { Property } from './pages/Property';
import { PropertyCourselShortcode } from './pages/PropertyCourselShortcode';
import { PropertyPage } from './pages/PropertyPage';
import { NewProperty } from './pages/NewProperty';
import { NewListing } from './pages/NewListing';
import { useAuth } from './hooks/useAuth';
import { AdminRoute } from './components/admin/AdminRoute';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminExport } from './pages/admin/AdminExport';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminActivity } from './pages/admin/AdminActivity';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { Blogs } from './pages/Blogs';
import { BlogDetail } from './pages/BlogDetail';
import { ContactPage } from './pages/ContactPage';
import { Premium } from './pages/Premium';
import { AcreageForSale } from './pages/AcreageForSale';
import { AcreageForSaleTexas } from './pages/AcreageForSaleTexas';
import { AcreageForSaleCalifornia } from './pages/AcreageForSaleCalifornia';
import { AcreageForSaleFlorida } from './pages/AcreageForSaleFlorida';
import { AcreageForSaleColorado } from './pages/AcreageForSaleColorado';
import { AcreageForSaleTennessee } from './pages/AcreageForSaleTennessee';
import { AcreageForSaleArizona } from './pages/AcreageForSaleArizona';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Homepage />;
  }
  
  return <>{children}</>;
}

export function App() {
  console.log('🔍 DEBUG: App component rendered');
  console.log('🔍 DEBUG: Current URL:', window.location.href);

  useEffect(() => {
    const clearOldSupabaseSessions = async () => {
      try {
        const result = await supabase.auth.getSession();
        if (result.error) {
          const errorMsg = result.error.message || '';
          if (
            errorMsg.includes('bad_jwt') ||
            errorMsg.includes('invalid JWT') ||
            errorMsg.includes('signature is invalid') ||
            errorMsg.includes('exp')
          ) {
            console.log('Detected invalid/expired JWT, clearing all Supabase sessions...');
            const allKeys = Object.keys(localStorage);
            const supabaseKeys = allKeys.filter(key =>
              key.startsWith('supabase') ||
              key.startsWith('sb-') ||
              key.includes('auth-token')
            );
            supabaseKeys.forEach(key => localStorage.removeItem(key));
            await supabase.auth.signOut().catch(() => {});
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    clearOldSupabaseSessions();

    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/acreage-for-sale" element={<AcreageForSale />} />
        <Route path="/acreage-for-sale/texas" element={<AcreageForSaleTexas />} />
        <Route path="/acreage-for-sale/california" element={<AcreageForSaleCalifornia />} />
        <Route path="/acreage-for-sale/florida" element={<AcreageForSaleFlorida />} />
        <Route path="/acreage-for-sale/colorado" element={<AcreageForSaleColorado />} />
        <Route path="/acreage-for-sale/tennessee" element={<AcreageForSaleTennessee />} />
        <Route path="/acreage-for-sale/arizona" element={<AcreageForSaleArizona />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/edit/:id" element={
          <ProtectedRoute>
            <DashboardEditListing />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/inbox" element={
          <ProtectedRoute>
            <DashboardInbox />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/properties" element={
          <AdminRoute>
            <AdminProperties />
          </AdminRoute>
        } />
        <Route path="/admin/export" element={
          <AdminRoute>
            <AdminExport />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/analytics" element={
          <AdminRoute>
            <AdminAnalytics />
          </AdminRoute>
        } />
        <Route path="/admin/activity" element={
          <AdminRoute>
            <AdminActivity />
          </AdminRoute>
        } />
        <Route path="/admin/messages" element={
          <AdminRoute>
            <AdminMessages />
          </AdminRoute>
        } />
        <Route path="/admin/settings" element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        } />
        <Route path="/admin/blogs" element={
          <AdminRoute>
            <AdminBlogs />
          </AdminRoute>
        } />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/sell-my-land-fast" element={
          <SellMyLandFast />
        } />
        <Route path="/sell-land-fast" element={<SellLandFast />} />
        <Route path="/sell-land-fast-alabama" element={<SellLandFastAlabama />} />
        <Route path="/sell-land-fast-in-alaska" element={<SellLandFastAlaska />} />
        <Route path="/sell-land-fast-in-arizona" element={<SellLandFastArizona />} />
        <Route path="/sell-land-fast-in-delaware" element={<SellLandFastDelaware />} />
        <Route path="/sell-land-fast-in-florida" element={<SellLandFastFlorida />} />
        <Route path="/sell-land-fast-in-georgia" element={<SellLandFastGeorgia />} />
        <Route path="/sell-land-fast-in-idaho" element={<SellLandFastIdaho />} />
        <Route path="/sell-land-fast-in-illinois" element={<SellLandFastIllinois />} />
        <Route path="/sell-land-fast-in-indiana" element={<SellLandFastIndiana />} />
        <Route path="/sell-land-fast-in-iowa" element={<SellLandFastIowa />} />
        <Route path="/sell-land-fast-in-kansas" element={<SellLandFastKansas />} />
        <Route path="/sell-land-fast-in-kentucky" element={<SellLandFastKentucky />} />
        <Route path="/sell-land-fast-in-louisiana" element={<SellLandFastLouisiana />} />
        <Route path="/sell-land-fast-in-maine" element={<SellLandFastMaine />} />
        <Route path="/sell-land-fast-in-maryland" element={<SellLandFastMaryland />} />
        <Route path="/sell-land-fast-in-massachusetts" element={<SellLandFastMassachusetts />} />
        <Route path="/sell-land-fast-in-massachsetts" element={<SellLandFastMassachusetts />} />
        <Route path="/sell-land-fast-in-michigan" element={<SellLandFastMichigan />} />
        <Route path="/sell-land-fast-in-minnesota" element={<SellLandFastMinnesota />} />
        <Route path="/sell-land-fast-in-mississippi" element={<SellLandFastMississippi />} />
        <Route path="/sell-land-fast-in-missouri" element={<SellLandFastMissouri />} />
        <Route path="/sell-land-fast-in-montana" element={<SellLandFastMontana />} />
        <Route path="/sell-land-fast-in-nebraska" element={<SellLandFastNebraska />} />
        <Route path="/sell-land-fast-in-nevada" element={<SellLandFastNevada />} />
        <Route path="/sell-land-fast-in-new-hampshire" element={<SellLandFastNewHampshire />} />
        <Route path="/sell-land-fast-in-new-jersey" element={<SellLandFastNewJersey />} />
        <Route path="/sell-land-fast-in-new-mexico" element={<SellLandFastNewMexico />} />
        <Route path="/sell-land-fast-in-new-york" element={<SellLandFastNewYork />} />
        <Route path="/sell-land-fast-in-north-carolina" element={<SellLandFastNorthCarolina />} />
        <Route path="/sell-land-fast-in-north-dakota" element={<SellLandFastNorthDakota />} />
        <Route path="/sell-land-fast-in-ohio" element={<SellLandFastOhio />} />
        <Route path="/sell-land-fast-in-oklahoma" element={<SellLandFastOklahoma />} />
        <Route path="/sell-land-fast-in-oregon" element={<SellLandFastOregon />} />
        <Route path="/sell-land-fast-in-pennsylvania" element={<SellLandFastPennsylvania />} />
        <Route path="/sell-land-fast-in-rhode-island" element={<SellLandFastRhodeIsland />} />
        <Route path="/sell-land-fast-in-south-carolina" element={<SellLandFastSouthCarolina />} />
        <Route path="/sell-land-fast-in-south-dakota" element={<SellLandFastSouthDakota />} />
        <Route path="/sell-land-fast-in-tennessee" element={<SellLandFastTennessee />} />
        <Route path="/sell-land-fast-in-texas" element={<SellLandFastTexas />} />
        <Route path="/sell-land-fast-in-utah" element={<SellLandFastUtah />} />
        <Route path="/sell-land-fast-in-vermont" element={<SellLandFastVermont />} />
        <Route path="/sell-land-fast-in-virginia" element={<SellLandFastVirginia />} />
        <Route path="/sell-land-fast-in-washington" element={<SellLandFastWashington />} />
        <Route path="/sell-land-fast-in-wisconsin" element={<SellLandFastWisconsin />} />
        <Route path="/sell-land-fast-in-wyoming" element={<SellLandFastWyoming />} />
        <Route path="/sell-land-fast-in-arkansas" element={<SellLandFastArkansas />} />
        <Route path="/sell-land-fast-in-california" element={<SellLandFastCalifornia />} />
        <Route path="/sell-land-fast-in-colorado" element={<SellLandFastColorado />} />
        <Route path="/sell-land-fast-in-connecticut" element={<SellLandFastConnecticut />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/submit-property" element={<SubmitProperty />} />
        <Route path="/user-dashboard-main" element={<UserDashboardMain />} />
        <Route path="/about" element={<About />} />
        <Route path="/about_1" element={<About />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/contact-us-3" element={<ContactUs3 />} />
        <Route path="/favorite-properties" element={<FavoriteProperties />} />
        <Route path="/homepage" element={<HomepageSEO />} />
        <Route path="/land-for-sale-in-dallas" element={<LandForSaleInDallas />} />
        <Route path="/land-for-sale-in-florida" element={<LandForSaleInFlorida />} />
        <Route path="/land-for-sale-in-houston" element={<LandForSaleInHouston />} />
        <Route path="/land-for-sale-in-indiana" element={<LandForSaleInIndiana />} />
        <Route path="/land-for-sale-in-iowa" element={<LandForSaleInIowa />} />
        <Route path="/land-for-sale-in-jacksonville" element={<LandForSaleInJacksonville />} />
        <Route path="/land-for-sale-in-jamaica" element={<LandForSaleInJamaica />} />
        <Route path="/land-for-sale-in-joshua-tree" element={<LandForSaleInJoshuaTree />} />
        <Route path="/land-for-sale-in-kansas" element={<LandForSaleInKansas />} />
        <Route path="/land-for-sale-in-knoxville" element={<LandForSaleInKnoxville />} />
        <Route path="/land-for-sale-in-los-angeles" element={<LandForSaleInLosAngeles />} />
        <Route path="/land-for-sale-in-louisiana" element={<LandForSaleInLouisiana />} />
        <Route path="/land-for-sale-in-maryland" element={<LandForSaleInMaryland />} />
        <Route path="/land-for-sale-in-new-hampshire" element={<LandForSaleInNewHampshire />} />
        <Route path="/land-for-sale-in-new-jersey" element={<LandForSaleInNewJersey />} />
        <Route path="/land-for-sale-in-newmexico" element={<LandForSaleInNewMexico />} />
        <Route path="/land-for-sale-in-new-mexico" element={<LandForSaleInNewMexicoHyphenated />} />
        <Route path="/land-for-sale-in-pa" element={<LandForSaleInPennsylvania />} />
        <Route path="/land-for-sale-in-phelan" element={<LandForSaleInPhelan />} />
        <Route path="/land-for-sale-in-sacramento" element={<LandForSaleInSacramento />} />
        <Route path="/land-for-sale-in-south-carolina" element={<LandForSaleInSouthCarolina />} />
        <Route path="/land-for-sale-in-san-antonio" element={<LandForSaleInSanAntonio />} />
        <Route path="/land-for-sale-in-south-dakota" element={<LandForSaleInSouthDakota />} />
        <Route path="/land-for-sale-in-temecula" element={<LandForSaleInTemecula />} />
        <Route path="/land-for-sale-in-utah" element={<LandForSaleInUtah />} />
        <Route path="/land-for-sale-in-vermont" element={<LandForSaleInVermont />} />
        <Route path="/land-for-sale-in-virginia" element={<LandForSaleInVirginia />} />
        <Route path="/land-for-sale-in-washington" element={<LandForSaleInWashington />} />
        <Route path="/land-for-sale-washington" element={<LandForSaleInWashington />} />
        <Route path="/land-in-phelan" element={<LandInPhelan />} />
        <Route path="/new-listing" element={<AddListing />} />
        <Route path="/new-listing" element={<NewListing />} />
        <Route path="/new-property" element={<NewProperty />} />
        <Route path="/phelan" element={<LandForSaleInPhelan />} />
        <Route path="/phelan-2" element={<Phelan2 />} />
        <Route path="/phelan-ca-land-for-sale" element={<PhelanCaLandForSale />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property-coursel-shortcode" element={<PropertyCourselShortcode />} />
        <Route path="/property-page" element={<PropertyPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/edit-property/:id" element={
          <ProtectedRoute>
            <EditProperty />
          </ProtectedRoute>
        } />
        <Route path="/new-listing" element={<AddListing />} />
        <Route path="/new-property" element={<NewProperty />} />
        <Route path="/phelan" element={<LandForSaleInPhelan />} />
        <Route path="/phelan-2" element={<Phelan2 />} />
        <Route path="/phelan-ca-land-for-sale" element={<PhelanCaLandForSale />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property-coursel-shortcode" element={<PropertyCourselShortcode />} />
        <Route path="/property-page" element={<PropertyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}