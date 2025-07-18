"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { SecondaryButton } from "@/components/Buttons";

export default function Header() {
    useEffect(() => {
        const MenuCheckbox = document.getElementById(
            "lines"
        ) as HTMLInputElement;
        const NavUl = document.querySelector(".MenuSection") as HTMLElement;
        const links =
            document.querySelectorAll<HTMLAnchorElement>(".slide-menu a");

        const handleChange = () => {
            if (MenuCheckbox.checked) NavUl.classList.add("open");
            else NavUl.classList.remove("open");
        };

        const closeMenu = () => {
            MenuCheckbox.checked = false;
            NavUl.classList.remove("open");
        };

        MenuCheckbox.addEventListener("change", handleChange);
        links.forEach((link) => link.addEventListener("click", closeMenu));

        return () => {
            MenuCheckbox.removeEventListener("change", handleChange);
            links.forEach((link) =>
                link.removeEventListener("click", closeMenu)
            );
        };
    }, []);

    return (
        <div className="Headers">
            <header className="header">
                <div className="menu">
                    <label className="lines">
                        <input type="checkbox" id="lines" />
                        <svg className="svg" viewBox="0 0 32 32">
                            <path
                                className="line top-bottom"
                                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                            ></path>
                            <path
                                className="line middle"
                                d="M7 16 27 16"
                            ></path>
                        </svg>
                    </label>
                </div>

                <div className="logo">
                    <Link href="/">
                        <Image
                            alt="شعار ألف"
                            width="36"
                            height="36"
                            src="/Assets/AlifLogo.svg"
                        />
                    </Link>
                </div>

                <div className="top-menu">
                    <ul className="list">
                        <li className="item">
                            <Link href="Learn/">الـتـعـلـيـم</Link>
                        </li>
                        <li className="item">
                            <Link href="Docs/">الـوثـائـق</Link>
                        </li>
                        <li className="item">
                            <Link href="Support/">الـدعـم</Link>
                        </li>
                    </ul>
                    <div className="contribute">
                        <span className="line"></span>
                        <SecondaryButton text="المساهمة" href="/Contribution" />
                    </div>
                </div>
            </header>

            <section className="MenuSection">
                <div className="stroke-anim"></div>
                <div className="slide-menu">
                    <Link href="/Learn/">الـتـعـلـيــم</Link>
                    <Link href="/Docs/">الـوثـائـق</Link>
                    <Link href="/Support/">الـدعـم</Link>
                    <Link href="/Contribution/">المساهمة</Link>
                    <Link href="/License/">الـرخـصـة</Link>
                    <Link href="/AboutUs/">مـن نـحـن</Link>
                    <a href="/Alif2/">ألـف2</a>
                </div>
            </section>
        </div>
    );
}
