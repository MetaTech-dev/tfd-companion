import { getAccountId } from "@/data-sources/nexon/account";
import Link from "next/link";
import { redirect } from "next/navigation";

// this page should take user name as input and then redirect to account page with user name
export default function HomePage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const rawFormData = {
      userName: formData.get("userName"),
    };
    if (!rawFormData.userName) {
      return redirect("/");
    }
    const ouid = await getAccountId(rawFormData.userName?.toString());

    return redirect(`/account/${ouid}`);
  }

  return (
    <>
      <h1>Home</h1>
      <p>View Account</p>
      <form action={handleSubmit}>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          required
          pattern="^[a-zA-Z0-9_]+#[0-9]+$"
        />
        <button type="submit">Submit</button>
      </form>
      <Link href="/metadata">Metadata</Link>
    </>
  );
}
