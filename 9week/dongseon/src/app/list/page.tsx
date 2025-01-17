import { connectDB } from "@/utils/database";
import ListItem from "../../components/ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  let data;

  try {
    const db = (await connectDB).db("forum");
    data = await db.collection("post").find().toArray();
  } catch (err) {
    console.error(err);
    return <div>DB error</div>;
  }

  return (
    <div className="list-bg">
      {data.map((d, key) => (
        <ListItem
          data={{
            _id: d._id.toString(),
            title: d.title,
            content: d.content,
          }}
          key={key}
        />
      ))}
    </div>
  );
}
