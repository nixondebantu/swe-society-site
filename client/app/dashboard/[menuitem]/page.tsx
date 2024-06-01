import Members from "./_pages/Members";

function page({ params }: { params: { menuitem: string } }) {
  switch (params.menuitem) {
    case "members":
      return <Members />;

    default:
      return <div>This is {params.menuitem} page</div>;
  }
}

export default page;
