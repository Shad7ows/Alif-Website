import Image from "next/image";
import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <a className="item text" href="License/">
                الـرخـصـة
            </a>
            <a className="item text" href="AboutUs/">
                مـن نـحـن
            </a>
            <a className="item text" href="/Alif2/index.html">
                ألـف2
            </a>
            <a className="item circle" href="#">
                <Image
                    className="Image"
                    alt="انستاغرام"
                    width="25"
                    height="25"
                    src="/Assets/Instagram.svg"
                />
            </a>
            <a
                className="item circle"
                href="https://youtube.com/@aliflang47"
                target="_blank"
            >
                <Image
                    className="Image"
                    alt="يوتيوب"
                    width="25"
                    height="25"
                    src="/Assets/Youtube.svg"
                />
            </a>
            <a
                className="item circle"
                href="https://github.com/alifcommunity/Alif"
                target="_blank"
            >
                <Image
                    className="Image"
                    alt="غيتهب"
                    width="25"
                    height="25"
                    src="/Assets/Github.svg"
                />
            </a>
        </footer>
    );
}
