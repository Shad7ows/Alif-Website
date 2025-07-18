import Image from "next/image";
import Link from "next/link";

import { SecondaryButton } from "@/components/Buttons";

export default function Home() {
    return (
        <section className="Home Page">
            <div className="right">
                <div className="top">
                    <h1 className="title">
                        البرمجة
                        <br />
                        أصبحت أسهل
                    </h1>
                    <p className="paragraph">
                        قم بتجربة لغة البرمجة العربية ألف والتي ستفتح لك آفاق
                        جديدة في البرمجة
                    </p>
                    <LogoCard />
                </div>
                <div className="bottom">
                    <div className="download">
                        <span className="line"></span>
                        <SecondaryButton text="تحميل اللغة" href="/Download" />
                    </div>
                    <Link
                        className="underline-button"
                        href="https://t.me/aliflang"
                    >
                        انضم إلى المجتمع
                    </Link>
                </div>
            </div>
            <div className="left">
                <LogoCard />
            </div>
        </section>
    );
}

function LogoCard() {
    return (
        <div className="LogoCard GlassBG">
            <Image
                alt="شعار ألف"
                width="256"
                height="256"
                className="logo"
                src="/Assets/AlifLogo.svg"
            />
        </div>
    );
}
