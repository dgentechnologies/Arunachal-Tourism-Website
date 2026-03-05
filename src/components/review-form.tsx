"use client"

import { useState, type FormEvent } from "react"
import { Star, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function ReviewForm() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast({ title: "Please fill in all fields and select a rating.", variant: "destructive" })
      return
    }
    setSubmitting(true)
    // TODO: Replace with real API call to persist the review
    setTimeout(() => {
      setSubmitting(false)
      setOpen(false)
      setName("")
      setComment("")
      setRating(0)
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience.",
      })
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-8 gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
          <MessageSquarePlus className="h-4 w-4" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl">Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your visit to Arunachal Pradesh. Your review helps other travellers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-name">Your Name</Label>
            <Input
              id="review-name"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Star Rating */}
          <div className="flex flex-col gap-1.5">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors duration-150",
                      (hovered || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-comment">Your Review</Label>
            <Textarea
              id="review-comment"
              placeholder="Describe your experience..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !name.trim() || !comment.trim() || rating === 0}
            className="w-full mt-1"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
