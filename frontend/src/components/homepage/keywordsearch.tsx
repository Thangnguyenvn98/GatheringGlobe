import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const FormSchema = z.object({
  keyword: z.string(), // Removed .optional() to make the field required
})


const SearchByKeyword = () => {
    const onSubmit = (data: any) => {
      console.log(data.keyword);
    }
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        keyword: "",
      },
    })
    return (
        <Form {...form}>
          <div className = "flex flex-row">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input className="w-[600px] h-[40px] rounded-none text-green-800 bg-whitefont-normal border-none" placeholder="Event Keyword" {...field} />
                        </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className = "flex h-[40px] rounded-none text-green-800 bg-white hover:bg-green-800 hover:text-white font-normal shadow-none">Search</Button>
            </form>
          </div>
        </Form>
    )
}

export default SearchByKeyword;
