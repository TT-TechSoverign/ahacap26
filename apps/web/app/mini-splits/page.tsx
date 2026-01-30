import SectionServicesGeneral from '../../components/SectionServicesGeneral';
import NavbarV2 from '@/components/NavbarV2';
import Footer from '@/components/Footer';

export default function MiniSplitsPage() {
    return (
        <div className="bg-slate-900 min-h-screen">
            <NavbarV2 />
            <div className="pt-[140px]">
                <SectionServicesGeneral />
            </div>
            <Footer />
        </div>
    );
}
