import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "./redux/hook"
import { increment } from "./redux/features/counter";

export default function Home() {

  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  const onClick = () => {
    dispatch(increment({ value: 1 }));
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="min-w-[350px]">
        <CardHeader>
          <CardTitle>Counter</CardTitle>
        </CardHeader>
        <CardContent className="flex  justify-center items-center">
          <strong className="text-5xl">{count}</strong>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onClick}>Increment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
