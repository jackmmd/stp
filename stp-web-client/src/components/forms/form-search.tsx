import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Search {
  for:string;
  value:string;
}
interface Item {
  label: string; 
  value: string; 
  rejex:RegExp; 
  placeholder_expected: string;
  error_message:string;
}
interface Props {
  onSubmit: (search: Search) => void;
  onReset: () => void;
  select: {
    className?:string
    label?: string;
    items: Item[];
  };
}

export default function FormSearch({ onSubmit,onReset, select }: Props) {
  const [selectedItem,setSelectedItem] = useState<Item>(select.items[0])
  const [disabled,setDisabled] = useState<boolean>(true)
  
  const search_schema = z.object({
    for: z.string(),
    value: z
      .string()
      .min(2, "El mínimo de caracteres es 2")
      .max(100, "EL máximo de carateres es 100")
      .regex(selectedItem.rejex,{ message:selectedItem.error_message })
  });

  const form = useForm<Search>({
    resolver: zodResolver(search_schema),
    defaultValues:{
      for:select.items[0].value,
      value:""
    }
  });
  function handleSubmit(values: Search) {
    onSubmit(values);
  }
  function resetForm(){
    form.reset()
    onReset()
  }
  useEffect(()=>{
    form.reset()
  },[location.pathname])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-start justify-end pr-0 w-full max-w-md border rounded-2xl"
      >
        <FormField
          control={form.control}
          name="for"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select 
                key={field.value}
                onValueChange={(e)=>{
                  const item_found = select.items.find(i=>i.value===e)
                  if(item_found){
                    setSelectedItem(item_found)
                  }
                  field.onChange(e)
                }} 
                defaultValue={field.value} 
                name="search_for">
                  <SelectTrigger className={cn("w-fit border-none rounded-r-none",select.className)}>
                    <SelectValue
                      placeholder={select.label ?? `Buscar por`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {select.items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="value"
        render={({ field })=>(
          <FormItem className="w-full">
            <FormControl>
              <Input
                {...field}
                name="search_value"
                type="text"
                className="border-transparent shadow-none rounded-l-none"
                placeholder={select.items.find(i=>i.value===form.getValues().for)?.placeholder_expected}
                onChange={(e)=>{
                  if(e.target.value.length>=2){
                    setDisabled(false)
                  }else{
                    setDisabled(true)
                  }
                  field.onChange(e)
                }}
                />
              </FormControl>
              <FormMessage/>
          </FormItem>
        )}
        />
        <Button size="default" onClick={resetForm} type="reset" className="rounded-none h-input" variant="ghost">
          <X/>
        </Button>
        <Button size="default" disabled={disabled} type="submit" className="rounded-l-none h-input">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
}