// import { users } from "../../helper/random-image"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import DisplayUsers from "./DisplayUsers"

const FindUsers = () => {

    const [query, setQuery] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <Input placeholder="Search Users" onChange={handleChange} />
                </CardHeader>
                <CardContent>
                    <div className=" flex flex-col gap-4">
                        <DisplayUsers query={query} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FindUsers
