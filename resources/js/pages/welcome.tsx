import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bem vindo(a)">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Painel
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="flex items-center gap-2 rounded-sm border border-transparent bg-gray-200 dark:bg-gray-700 px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Entrar
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-xl leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Registrar
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg lg:flex-row dark:bg-[#161615]">
                    {/* Lado da imagem */}
                    <div className="flex h-1/2 w-full items-center justify-center bg-gray-50 lg:h-auto lg:w-1/2 dark:bg-[#1A1A15]">
                        <img
                            src="logo2.png"
                            alt="Logo"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Lado do texto */}
                    <div className="flex h-1/2 w-full flex-col justify-center p-6 sm:p-8 lg:h-auto lg:w-1/2 lg:p-12">
                        <h1 className="mb-4 text-lg font-semibold sm:text-xl lg:text-2xl dark:text-[#EDEDEC]">
                            Sistema de gerenciamento de processos
                        </h1>
                        <p className="text-sm leading-relaxed text-[#706f6c] sm:text-base dark:text-[#A1A09A]">
                            Maior controle dos processos e gestão financeira
                            para seu escritório.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
