import {ScrollToTopBtn,Footer} from './components';
import DesignerHeader from './components/DesignerHeader/DesignerHeader';
import DesignerNavbar from './components/DesignerNavbar/DesignerNavbar';


export default function DesignerLayout({children}) {
  return (
    <>
    <DesignerHeader/>
    <DesignerNavbar/>
    {children}
    <ScrollToTopBtn/>
    <Footer />
    </>
  )
}