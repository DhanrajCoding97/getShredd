import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SocialButton from './SocialButton';
import { createClient } from '@/lib/supabase/client';

type provider = 'google' | 'facebook' | 'github';

type providerType = {
    name: provider;
    label: string;
    icon: IconType;
    size: number;
};

const providers: providerType[] = [
    {
        name: 'google',
        label: 'Continue with Google',
        icon: FcGoogle,
        size: 30,
    },
    // {
    //     name: 'facebook',
    //     label: 'Continue with Facebook',
    //     icon: FaFacebookF,
    //     size: 30
    // },
    // {
    //     name: 'github',
    //     label: 'Continue with Github',
    //     icon: FaGithub,
    //     size: 30
    // },
];

const SocialAuthButtons = () => {
    const handleOAuthLogin = async (provider: provider) => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                // redirectTo: `${location.origin}/auth/callback`,
                redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
            },
        });
    };

    return (
        <div>
            {providers.map((provider: providerType) => {
                const Icon = provider.icon;
                return (
                    <SocialButton
                        key={provider.name}
                        action={() => handleOAuthLogin(provider.name)}
                    >
                        <Icon size={provider.size} />
                        {provider.label}
                    </SocialButton>
                );
            })}
        </div>
    );
};

export default SocialAuthButtons;
