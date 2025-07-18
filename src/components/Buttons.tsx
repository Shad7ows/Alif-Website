import Link from "next/link";

export function PrimaryButton({ text, href }: { text: string; href: string }) {
    return (
        <Link className="button1" href={href}>
            {text}
        </Link>
    );
}

export function SecondaryButton({
    text,
    href,
}: {
    text: string;
    href: string;
}) {
    return (
        <>
            <div className="button2-front">
                <Link href={href}>{text}</Link>
            </div>
            <div className="button2"></div>
        </>
    );
}

export function TertiaryButton({ text, href }: { text: string; href: string }) {
    return (
        <div className="button3">
            <Link className="label" href={href}>
                {text}
            </Link>
        </div>
    );
}
