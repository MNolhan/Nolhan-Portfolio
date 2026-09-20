import ArrowLeftIcon from '../Icon/arrowleft-icon';

export default function HeaderBack() {
    return (
        <div className="header-back">
            <a className="header-back__nav" href="/"><ArrowLeftIcon /> <span>Retourner au site</span></a>
        </div>
    )
}