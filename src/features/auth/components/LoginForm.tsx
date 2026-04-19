"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Resolver } from "dns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import z from "zod"
import { authClient } from "@/src/lib/authClient"
import { useState } from "react"

const signSchema = z.object({
    email: z.string().email({ message: "email invalido" }),
    password: z.string().min(8, ({ message: "senha invalida" }))
})

type signFormValues = z.infer<typeof signSchema>

export default function Login() {
    const [showPassword, setShowPassuord] = useState(false)
    const router = useRouter()

    const form = useForm<signFormValues>({
        resolver: zodResolver(signSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(formData: signFormValues) {
        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password
        }, {
            onRequest(ctx) {

            },
            onSuccess(ctx) {
                router.push("/dashboard")
                console.log("sucesso papai")
            },
            onError(ctx) {
                console.log("erro ao logar")
            },
        }
        )

    }


    return (


        <Card className="w-full max-w-sm ">
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                <CardHeader>
                    <CardTitle>Logue na sua conta</CardTitle>
                    <CardDescription>
                        digite seu e-mail
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" asChild>
                            <Link href="/signup">
                                Criar conta
                            </Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@email.com"
                                    required
                                    {...form.register("email")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                                <Input id="password" type="password" required {...form.register("password")} />
                            </div>
                        </div>
                    
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Entre com sua conta Google
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

