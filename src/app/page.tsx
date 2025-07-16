import Image from "next/image";
import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from "@/components/Buttons/Buttons";

export default function Home() {
    return (
        <div>
            <PrimaryButton text="السلام" href="https://aliflang.org" />
            <br />
            <SecondaryButton text="السلام عليكم" href="https://aliflang.org" />
            <br />
            <TertiaryButton text="السلام عليكم" href="https://aliflang.org" />
            <br />
            <div className="GlassBG LogoCard">
                <Image src="/Assets/AlifLogo.svg" alt="Alif Logo" width={100} height={100} />
            </div>
        </div>
    );
}
