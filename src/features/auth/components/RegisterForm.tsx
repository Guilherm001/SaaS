"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/src/lib/authClient"



const signupSchema = z.object({
    name: z.string().min(2, "Nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirmação de senha deve conter no mínimo 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
})

type SignupFormValues = z.infer<typeof signupSchema>



export default function Register() {

    const router = useRouter()
    const [showPassword, setShowPassuord] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    async function onSubmit(formData: SignupFormValues) {
        const { data, error } = await authClient.signUp.email({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }, {
            onRequest: (ctx) => {

            },
            onSuccess: (ctx) => {
                router.push("/dashboard")
                console.log("Registro realizado com sucesso!")

            },
            onError: (ctx) => {
                console.log("Erro ao registrar:", ctx.error)
            }
        }
        )
    }


    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm ring-0 shadow-none ">
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                            <Input
                                id="fieldgroup-name"
                                placeholder="Jordan Lee"
                                {...form.register("name")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                            <Input
                                id="fieldgroup-email"
                                type="email"
                                placeholder="name@example.com"
                                {...form.register("email")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <Input
                                id="fieldgroup-password"
                                type="password"
                                placeholder="••••••••"
                                {...form.register("password")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Password">Confirme a Senha</FieldLabel>
                            <Input
                                id="fieldgroup-confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...form.register("confirmPassword")}
                            />
                        </Field>
                        <Field orientation="horizontal">
                            <Button type="reset" variant="outline" asChild>
                                <Link href="/">
                                    Voltar
                                </Link>
                            </Button>
                            <Button type="submit">Cadastrar</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </Card>
        </div>
    )
}
