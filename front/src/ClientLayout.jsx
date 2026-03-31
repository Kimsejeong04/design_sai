import {Header,Navbar,ScrollToTopBtn,Footer} from './components';

export default function ClientLayout({children}) {
  return (
    <>
    <Header/>
    <Navbar/>
    {children}
    <ScrollToTopBtn/>
    <Footer />
    </>
  )
}