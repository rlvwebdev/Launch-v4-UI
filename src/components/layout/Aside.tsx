import '../../styles/components/Aside.css';

interface AsideProps {
  isOpen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Aside = ({ isOpen = false, className = '', children }: AsideProps) => {
  return (
    <aside
      className={`aside ${isOpen ? 'aside--open' : ''} ${className}`}
    >
      {children || (
        <>
          <div className="aside__header">
            <h3 className="aside__title">Details</h3>
          </div>
          <div className="aside__content">
            <p className="aside__placeholder">No details to display</p>
          </div>
        </>
      )}
    </aside>
  );
};
