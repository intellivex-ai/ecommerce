import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from './store/userStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import AdminPanel from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorBoundary from './components/ui/ErrorBoundary';
import PageTransition from './components/ui/PageTransition';
import CustomCursor from './components/ui/CustomCursor';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith('/admin');
    const isAuthPage = pathname === '/login' || pathname === '/register';

    // Don't show standard layout for admin panel
    if (isAdmin || isAuthPage) return <main className="flex-grow">{children}</main>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

const AppRoutes = () => {
    const { profile } = useUserStore();
    return (
        <PageTransition>{(location) => (
            <>
                <ScrollToTop />
                <Layout>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/admin" element={profile?.is_admin ? <AdminPanel /> : <Navigate to="/" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Layout>
            </>
        )}</PageTransition>
    );
};

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <ErrorBoundary>
            <CustomCursor />
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
            {isLoaded && (
                <BrowserRouter>
                    <div className="mesh-gradient min-h-screen noise">
                        <AppRoutes />
                    </div>
                </BrowserRouter>
            )}
        </ErrorBoundary>
    );
};

export default App;
