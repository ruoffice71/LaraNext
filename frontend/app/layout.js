"use client";
import "@/assets/styles/styles.css";
import Breadcrumb from "@/Components/Layout/Breadcrumb";
import Footer from "@/Components/Layout/Footer";
import Nav from "@/Components/Layout/Nav";
import Sidebar from "@/Components/Layout/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@/assets/styles/style.scss"
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({ children }) {
  const path = usePathname()
  const ignore_default_layout = ['/login', '/register']

  useEffect(() => {
    console.log(path)
  },[path])


  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      {/* এখানে Include কোন elament এর উপস্থিতি array এর মধ্যে আছে কিনা দেখে  */}
      {ignore_default_layout.includes(path) ?
        <body className="auth_body">
          {children}
        </body>
        :
        <body className="sb-nav-fixed">
          <Nav/>
          <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <Sidebar/>
              </div>
              <div id="layoutSidenav_content">
                  <main>
                      <div className="container-fluid px-4">
                          {children}
                      </div>
                  </main>
                  <Footer/>
              </div>
          </div>
        </body>
      }
    </html>
  );
}
