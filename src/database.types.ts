export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: number
          modified: string | null
          name: string
        }
        Insert: {
          id?: number
          modified?: string | null
          name: string
        }
        Update: {
          id?: number
          modified?: string | null
          name?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          comic_id: number
          id: number
          user_id: string
        }
        Insert: {
          comic_id: number
          id?: number
          user_id: string
        }
        Update: {
          comic_id?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_comic_id_fkey"
            columns: ["comic_id"]
            isOneToOne: false
            referencedRelation: "comics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chapters: {
        Row: {
          chapter_no: number
          comic_id: number
          id: number
          modified: string | null
        }
        Insert: {
          chapter_no: number
          comic_id: number
          id?: number
          modified?: string | null
        }
        Update: {
          chapter_no?: number
          comic_id?: number
          id?: number
          modified?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_comic_id_fkey"
            columns: ["comic_id"]
            isOneToOne: false
            referencedRelation: "comics"
            referencedColumns: ["id"]
          }
        ]
      }
      comics: {
        Row: {
          author_id: number | null
          description: string
          id: number
          modified: string | null
          status: Database["public"]["Enums"]["Status"] | null
          thumbnail: string
          title: string
        }
        Insert: {
          author_id?: number | null
          description: string
          id?: number
          modified?: string | null
          status?: Database["public"]["Enums"]["Status"] | null
          thumbnail: string
          title: string
        }
        Update: {
          author_id?: number | null
          description?: string
          id?: number
          modified?: string | null
          status?: Database["public"]["Enums"]["Status"] | null
          thumbnail?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "comics_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          }
        ]
      }
      parts: {
        Row: {
          chapter_id: number | null
          id: number
          link: string
          part_no: number
        }
        Insert: {
          chapter_id?: number | null
          id?: number
          link: string
          part_no: number
        }
        Update: {
          chapter_id?: number | null
          id?: number
          link?: string
          part_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "parts_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["Role"]
          user_id: string
          username: string | null
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["Role"]
          user_id: string
          username?: string | null
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["Role"]
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: "USER" | "ADMIN"
      Status: "ONGOING" | "COMPLETED" | "DROPPED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
