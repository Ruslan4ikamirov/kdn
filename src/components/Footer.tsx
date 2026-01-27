const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-accent text-base-content p-4">
        <aside>
            <p className="text-white font-medium">ГБУ ГППЦ ДОНМ © {new Date().getFullYear()} - Городской Психолого-Педагогический Центр</p>
        </aside>
    </footer>
  );
}

export default Footer;