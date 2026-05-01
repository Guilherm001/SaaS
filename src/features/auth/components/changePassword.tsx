'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"


export default function Email() {
    return (
        <div className="flex justify-center items-center min-h-screen">


            <Card className="w-full max-w-sm shadow-none p-6">
                <form action="">
                    <FieldGroup >
                        <Field>
                            <FieldLabel>
                                digite seu email
                            </FieldLabel>
                            <Input type="email" placeholder="email@email.com" />
                        </Field>

                        <Button>enviar</Button>

                    </FieldGroup>
                </form>
            </Card>
        </div>

    )
}