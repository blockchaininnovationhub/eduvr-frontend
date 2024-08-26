"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    firstname: z.string().min(2, {
      message: "Firstname must be at least 2 characters.",
    })
})

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstname: ""
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        
      }
    
    return(
        <>
          <div>
            <div className="cr_container flex flex-col">
                <div className="cr_child circle-red"></div>
                <div className="cr_child circle-blue"></div>
              </div>
          </div>
          <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
              <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full">
                <div className="pr-10 max-w-sm">
                  <h2 className="text-4xl font-bold">Connect to virtual <br /> EduVr classroom</h2>
                  <p className="mt-4 text-base">if you don't have an account you can <a>register here</a></p>
                </div>
                <div className="pr-10">
                  lorem ipsum dolor sit amet
                </div>
                <div className="max-w-sm flex-1">
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Firstname</FormLabel>
                                      <FormControl>
                                          <Input placeholder="shadcn" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                    
                                )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
              </div>
          </div>
        </>
    );
}

export default Login;