"use client"
import { trpc } from "@/_trpc/client";
import { Iconify } from "@/components/iconify";
import { Alert, Box, Button, Divider, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function SignUpView() {
    const router = useRouter();

    // State to hold form values
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState<string>('')

    // State to show/hide passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // tRPC create user mutation
    const createUserMutation = trpc.user.create.useMutation({
        onSuccess: () => {
            router.push('/signin');
        },
        onError: (error) => {
            console.log(error.message);
            setErrorMessage(error.message)
        }
    });

    // Handle Sign Up form submission
    const handleSignUp = useCallback(() => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        createUserMutation.mutate({
            email,
            name,
            password,
        });
    }, [email, name, password, confirmPassword, createUserMutation]);

    const renderForm = (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
            }}
        >
            <TextField
                fullWidth
                name="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <TextField
                fullWidth
                name="name"
                label="Fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <TextField
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{ mb: 3 }}
            />

            <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    <Iconify icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{ mb: 3 }}
            />

            <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={handleSignUp}
                disabled={createUserMutation.isPending}
            >
                {createUserMutation.isPending ? 'Signing up...' : 'Sign up'}
            </Button>
        </Box>
    );

    return (
        <>
            <Box
                sx={{
                    gap: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 5,
                }}
            >
                <Typography variant="h5">Sign up</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    Already have an account?
                    <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => router.push('/signin')}>
                        Sign in
                    </Link>
                </Typography>
            </Box>
            {errorMessage && (
                <Alert sx={{ mb: 4 }} severity="error">{errorMessage || "Failed Register"}</Alert>
            )}
            {renderForm}
            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
                >
                    OR
                </Typography>
            </Divider>
            <Box
                sx={{
                    gap: 1,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <IconButton color="inherit">
                    <Iconify width={22} icon="socials:google" />
                </IconButton>
                <IconButton color="inherit">
                    <Iconify width={22} icon="socials:github" />
                </IconButton>
                <IconButton color="inherit">
                    <Iconify width={22} icon="socials:twitter" />
                </IconButton>
            </Box>
        </>
    );
}
