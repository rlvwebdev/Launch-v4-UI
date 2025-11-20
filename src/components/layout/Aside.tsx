import '../../styles/components/Aside.css';

interface AsideProps {
  isOpen?: boolean;
  className?: string;
}

export const Aside = ({ isOpen = false, className = '' }: AsideProps) => {
  return (
    <aside
      className={`aside ${isOpen ? 'aside--open' : ''} ${className}`}
    >
      <div className="aside__header">
        <h3 className="aside__title">Details</h3>
      </div>
      <div className="aside__content">
        {/* Aside content will be populated dynamically based on context */}
        <p className="aside__placeholder">No details to display</p>
      </div>
    </aside>
  );
};
