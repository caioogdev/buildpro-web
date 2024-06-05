import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import homeOne from '../../assets/homeOne.svg';
import homeTwo from '../../assets/homeTwo.svg';
import homeThree from '../../assets/homeThree.svg';
import { CgMail } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { handleAxiosError } from "@/hooks/services/handleAxiosError";
import { useAuth } from "@/hooks/auth";
import { toast } from 'sonner';
import { Toaster } from "@/components/ui/sonner"; // Importando o Toaster configurado para usar Sonner

const SignIn: React.FC = () => {
    const [currentItem, setCurrentItem] = useState(0);
    const items = [homeOne, homeTwo, homeThree];
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItem((prevItem) => (prevItem + 1) % items.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [items.length]);

    const loginSchema = z.object({
        email: z.string().email({ message: "E-mail ou senha inválidos." }),
        password: z.string().min(6, { message: "A senha não cumpre os requisitos mínimos de segurança" })
    });

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit: SubmitHandler<any> = async (data) => {
        try {
            loginSchema.parse(data);
            const response = await login(data.email, data.password);

            const now = new Date();
            const formattedDate = `${now.toLocaleDateString()} às ${now.toLocaleTimeString()}`;

            if (response.status === 200) {
                toast.success('Login efetuado com sucesso!', {
                    description: `Data: ${formattedDate}`
                });
                navigate('/');
            } else {
                toast.error('Credenciais inválidas.', {
                    description: `Data: ${formattedDate}`
                });
            }
        } catch (error) {
            toast.error('Erro ao fazer login. Tente novamente mais tarde.', {
                description: new Date().toLocaleString()
            });
            handleAxiosError(error);
        }
    };

    return (
        <main className="h-screen flex w-full">
            <div className="bg-primary-foreground w-full h-full flex items-center justify-center p-16">
                <div className="w-full max-w-xl overflow-hidden relative">
                    <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
                        {items.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-full">
                                <div className="flex aspect-square bg-background rounded-lg p-8">
                                    <img src={item} alt={`Imagem ${index + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold tracking-tighter">
                            Entre com sua conta
                        </CardTitle>
                        <CardDescription>
                            Utilize seu email para efetuar o login
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu email..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite sua senha..." type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-6 w-full">Entrar</Button>
                            </form>
                        </Form>
                        <div className="flex items-center gap-4 mt-3">
                            <Separator />
                            <span className="text-xs text-muted-foreground">OU</span>
                            <Separator />
                        </div>
                        <div className="flex flex-col items-center justify-center mt-4 text-muted-foreground">
                            <h1 className="text-xs">Suporte Técnico</h1>
                            <h1 className="flex text-xs items-center space-x-1"><CgMail />suporte@gmail.com</h1>
                        </div>
                    </CardContent>
                </Card>
            </section>
            <Toaster />
        </main>
    );
}

export default SignIn;
