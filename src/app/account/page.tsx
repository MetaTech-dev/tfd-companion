import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAccountOuid } from "@/data-sources/nexon/account";
import Link from "next/link";
import { redirect } from "next/navigation";

// this page should take user name as input and then redirect to account page with user name
export default function AccountPage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const rawFormData = {
      userName: formData.get("userName"),
    };
    if (!rawFormData.userName) {
      return redirect("/");
    }
    const ouid = await getAccountOuid(rawFormData.userName?.toString());

    return redirect(`/account/${ouid}`);
  }

  return (
    <main className="flex flex-col items-center container overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="userName" className="text-sm font-medium">
          User Name
        </label>
        <Input
          type="text"
          name="userName"
          id="userName"
          required
          pattern="^[a-zA-Z0-9_]+#[0-9]+$"
          placeholder="UserName#1234"
        />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
