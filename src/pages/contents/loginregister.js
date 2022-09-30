import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const Loginregister = () => {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            {user ? (
                <Link href="/dashboard">
                    <a className="ml-4 text-sm text-white underline">
                        Dashboard
                    </a>
                </Link>
            ) : (
                <>
                    <Link href="/login">
                        <a className="text-sm text-white underline">Login</a>
                    </Link>

                    <Link href="/register">
                        <a className="ml-4 text-sm text-white underline">
                            Register
                        </a>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Loginregister
