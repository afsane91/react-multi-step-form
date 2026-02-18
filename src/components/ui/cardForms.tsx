import { Card, CardContent } from "./card";

type CardFormsProps = {
  children: React.ReactNode;
};

export default function CardForms({ children }: CardFormsProps) {
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="w-full max-w-3xl">
        <Card>
          <CardContent className="p-12">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
