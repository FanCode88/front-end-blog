import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PostListPage from './pages/PostListPage/PostListPage.jsx';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage.jsx';
import Write from './pages/Write/Write.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            {
                path: '/posts',
                element: <PostListPage />,
            },
            {
                path: '/posts/:slug',
                element: <SinglePostPage />,
            },
            {
                path: '/write',
                element: <Write />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ToastContainer position="bottom-right" />
            </QueryClientProvider>
        </ClerkProvider>
    </StrictMode>
);
