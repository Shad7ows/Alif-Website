import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from "@/components/buttons/buttons";

export default function Home() {
    return (
        <div>
            <PrimaryButton text="السلام عليكم" href="https://aliflang.org" />
            <br />
            <SecondaryButton text="السلام عليكم" href="https://aliflang.org" />
            <br />
            <TertiaryButton text="السلام عليكم" href="https://aliflang.org" />
        </div>
    );
}
