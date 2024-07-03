'use client'
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/vVUGACvQM0u
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { PatientContext } from "@/contexts/patient-context"
import { useContext, useState } from "react"
import { Patient } from "@/data/client/models"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function PatientEditPopup() {
  const patientContext = useContext(PatientContext);
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        firstName: z.string().min(2, "First name is required"),
        lastName: z.string().min(2, "Last name is required"),
        dateOfBirth: z.date("Date of birth is required"),
        email: z.string().email("Invalid email address"),
      }),
    ),
  })
  const onSubmit = (data) => {
    patientContext.addPatient(new Patient(data));
    setOpen(false);
    reset();
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle>Add/Edit patient</CardTitle>
            <CardDescription>
              Modify patient details in the form below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" error={errors.firstName?.message} {...register("firstName")} />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" error={errors.lastName?.message} {...register("lastName")}/>
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" error={errors.dateOfBirth?.message} {...register("dateOfBirth", { valueAsDate: true })} />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" error={errors.email?.message} {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <SheetFooter>
                <div className="flex gap-2 place-content-end">
                  <Button type="submit">Save</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </form>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
