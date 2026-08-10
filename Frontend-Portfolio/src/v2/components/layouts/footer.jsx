import LinkedinIcon from '../Icon/linkedin-icon';
import GithubIcon from '../Icon/github-icon';
import MailIcon from '../Icon/mail-icon';
import ArrowUpIcon from '../Icon/arrowup-icon';

export default function Footer() {
    return (
        <div className="footercontainer">
            <footer className="footer" id="footer">

                <div className="footer__credit">
                    <span className="footer__credit--white">Nolhan</span>
                    <span className="footer__credit--red">Dev</span>
                    <span className="footer__credit--white">. - © 2026</span>
                </div>

                <div className="footer__social">
                    <a href="https://www.linkedin.com/in/nolhan-marteau-03455a2ab/" className="footer__social--link"><LinkedinIcon /></a>
                    <a href="https://github.com/MNolhan" className="footer__social--link"><GithubIcon /></a>
                    <a href="mailto:mrt.nolhan@gmail.com" className="footer__social--link"><MailIcon /></a>
                </div>

                <div className="footer__nav">
                    <a href="#" className="footer__nav--link">Haut de page <ArrowUpIcon /></a>
                </div>

            </footer>
        </div>
    );
}