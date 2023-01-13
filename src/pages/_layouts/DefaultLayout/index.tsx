import { Header } from '../../../components/Header';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <div className="fixed h-full w-full bg-gradient-to-t from-gray2 to-background p-4">
        {children}
      </div>
    </>
  );
}
