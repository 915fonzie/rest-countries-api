import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Homepage, { loader as homeLoader } from './pages/Homepage.jsx'
import CountryDetails, {loader as detailsLoader} from './pages/CountryDetails.jsx'
import './css/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        name: "HOME",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        loader: homeLoader(queryClient),
      },
      {
        path: ":country",
        name: "COUNTRY",
        element: <CountryDetails />,
        errorElement: <ErrorPage />,
        loader: detailsLoader(queryClient),
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
