import "./Buttons.css";

export function PrimaryButton({ text, href }: { text: string; href: string }) {
    return (
        <div>
            <div className="button2-front">
                <a href={href}>{text}</a>
            </div>
            <div className="button2"></div>
        </div>
    );
}

export function SecondaryButton({ text, href }: { text: string; href: string }) {
    return (
        <div>
            <a className="button1" href={href}>
                {text}
            </a>
        </div>
    );
}

export function TertiaryButton({ text, href }: { text: string; href: string }) {
    return (
        <div>
            <div className="button3">
                <a className="label" href={href}>
                    {text}
                </a>
            </div>
        </div>
    );
}
