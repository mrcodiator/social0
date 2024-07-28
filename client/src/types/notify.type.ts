export interface NotifyType {
    _id: string
    user: string
    type: "like" | "comment" | "follow";
    action: string
    message: string
    createdAt: Date
    seen: boolean
}