"use client";

import { Auth } from "@supabase/auth-ui-react";
import Modal from "./modal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    const onChange = (open: boolean) => {
        if (!open){
            onClose();
        }
    }

    useEffect(() => {
        if(session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    return (
        <Modal title="Welcome back" description="Login to your account" isOpen={isOpen} onChange={onChange}>
            <Auth
                supabaseClient={supabaseClient}
                magicLink
                providers={['google', 'github']}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: 'green',
                          brandAccent: 'darkgreen',
                        },
                      },
                    },
                }}
            />
        </Modal>
    );
}
 
export default AuthModal;