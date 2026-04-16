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



const signupSchema = z.object({
    name: z.string().min(2, "Nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirmação de senha deve conter no mínimo 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
})


export default function Register() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm ring-0 shadow-none ">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                        <Input id="fieldgroup-name" placeholder="Jordan Lee" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="name@example.com"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Input
                            id="Password"
                            type="Password"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="Password">Confirme a Senha</FieldLabel>
                        <Input
                            id="Password"
                            type="Password"
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <Button type="reset" variant="outline" asChild>
                            <Link href="/">
                                Voltar
                            </Link>
                        </Button>
                        <Button type="submit">Submit</Button>
                    </Field>
                </FieldGroup>
            </Card>
        </div>
    )
}
