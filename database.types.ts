export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      captains: {
        Row: {
          created_at: string
          id: string
          name: string
          player_id: string
          team_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          player_id: string
          team_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          player_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "captains_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "captains_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          team_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          team_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coaches_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      commentators: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commentators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      constituencies: {
        Row: {
          county: string
          county_id: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          county: string
          county_id?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          county?: string
          county_id?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "constituencies_county_fkey"
            columns: ["county"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "constituency_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      counties: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      fans: {
        Row: {
          created_at: string
          id: string
          status: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fans_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favourite_matches: {
        Row: {
          created_at: string
          id: string
          match_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          match_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favourite_matches_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favourite_matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favourite_teams: {
        Row: {
          created_at: string
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favourite_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favourite_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: string
          league_id: string | null
          name: string | null
          ward_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          league_id?: string | null
          name?: string | null
          ward_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          league_id?: string | null
          name?: string | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      league_teams: {
        Row: {
          created_at: string
          editor: string | null
          id: string
          league_id: string
          reviewed: boolean
          team_id: string
        }
        Insert: {
          created_at?: string
          editor?: string | null
          id?: string
          league_id: string
          reviewed?: boolean
          team_id: string
        }
        Update: {
          created_at?: string
          editor?: string | null
          id?: string
          league_id?: string
          reviewed?: boolean
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_teams_editor_fkey"
            columns: ["editor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "league_teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          budget: string | null
          county: string | null
          created_at: string
          end_date: string | null
          id: string
          name: string | null
          poster: string | null
          start_date: string | null
          started: boolean | null
          sub_county: string | null
          type: string | null
          ward: string | null
        }
        Insert: {
          budget?: string | null
          county?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string | null
          poster?: string | null
          start_date?: string | null
          started?: boolean | null
          sub_county?: string | null
          type?: string | null
          ward?: string | null
        }
        Update: {
          budget?: string | null
          county?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string | null
          poster?: string | null
          start_date?: string | null
          started?: boolean | null
          sub_county?: string | null
          type?: string | null
          ward?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leagues_county_fkey"
            columns: ["county"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "leagues_sub_county_fkey"
            columns: ["sub_county"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "leagues_ward_fkey"
            columns: ["ward"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["name"]
          },
        ]
      }
      matches: {
        Row: {
          commentator: string | null
          created_at: string
          date: string
          full_time: boolean | null
          group_id: string | null
          half_time: boolean | null
          id: string
          league_id: string | null
          referee_id: string | null
          team_a: string
          team_b: string
          time: string
          venue_id: string | null
        }
        Insert: {
          commentator?: string | null
          created_at?: string
          date: string
          full_time?: boolean | null
          group_id?: string | null
          half_time?: boolean | null
          id?: string
          league_id?: string | null
          referee_id?: string | null
          team_a: string
          team_b: string
          time: string
          venue_id?: string | null
        }
        Update: {
          commentator?: string | null
          created_at?: string
          date?: string
          full_time?: boolean | null
          group_id?: string | null
          half_time?: boolean | null
          id?: string
          league_id?: string | null
          referee_id?: string | null
          team_a?: string
          team_b?: string
          time?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_commentator_fkey"
            columns: ["commentator"]
            isOneToOne: false
            referencedRelation: "commentators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_a_fkey"
            columns: ["team_a"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_b_fkey"
            columns: ["team_b"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          conduct: string | null
          county_id: string
          created_at: string
          email: string
          field_group: string | null
          id: string
          image: string | null
          is_captain: boolean
          name: string
          number: string | null
          phone: string
          sub_county_id: string
          team_id: string
          ward_id: string
        }
        Insert: {
          conduct?: string | null
          county_id: string
          created_at?: string
          email: string
          field_group?: string | null
          id?: string
          image?: string | null
          is_captain?: boolean
          name: string
          number?: string | null
          phone: string
          sub_county_id: string
          team_id: string
          ward_id: string
        }
        Update: {
          conduct?: string | null
          county_id?: string
          created_at?: string
          email?: string
          field_group?: string | null
          id?: string
          image?: string | null
          is_captain?: boolean
          name?: string
          number?: string | null
          phone?: string
          sub_county_id?: string
          team_id?: string
          ward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "players_sub_county_id_fkey"
            columns: ["sub_county_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contituency_id: string | null
          county_id: string | null
          email: string
          full_name: string | null
          group: string | null
          id: string
          type: Database["public"]["Enums"]["user_types"] | null
          updated_at: string | null
          username: string | null
          ward_id: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          contituency_id?: string | null
          county_id?: string | null
          email: string
          full_name?: string | null
          group?: string | null
          id: string
          type?: Database["public"]["Enums"]["user_types"] | null
          updated_at?: string | null
          username?: string | null
          ward_id?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          contituency_id?: string | null
          county_id?: string | null
          email?: string
          full_name?: string | null
          group?: string | null
          id?: string
          type?: Database["public"]["Enums"]["user_types"] | null
          updated_at?: string | null
          username?: string | null
          ward_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_contituency_id_fkey"
            columns: ["contituency_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      red_cards: {
        Row: {
          created_at: string
          id: string
          match_id: string | null
          player_id: string | null
          rejected: boolean | null
          session: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          rejected?: boolean | null
          session?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          rejected?: boolean | null
          session?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "red_cards_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "red_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      referees: {
        Row: {
          created_at: string
          id: string
          name: string | null
          phone: string | null
          user_id: string | null
          ward_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
          user_id?: string | null
          ward_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          phone?: string | null
          user_id?: string | null
          ward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referees_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          created_at: string
          id: string
          match_id: string
          player_id: string
          rejected: boolean | null
          team_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          match_id: string
          player_id: string
          rejected?: boolean | null
          team_id: string
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string
          player_id?: string
          rejected?: boolean | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          amount: string
          created_at: string
          id: string
          league_id: string
          title: string | null
        }
        Insert: {
          amount: string
          created_at?: string
          id?: string
          league_id: string
          title?: string | null
        }
        Update: {
          amount?: string
          created_at?: string
          id?: string
          league_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      team_groups: {
        Row: {
          created_at: string
          id: string
          league_id: string | null
          name: string | null
          ward_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          league_id?: string | null
          name?: string | null
          ward_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          league_id?: string | null
          name?: string | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_groups_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_groups_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          active: boolean
          balance: string | null
          county_id: string
          created_at: string
          id: string
          name: string
          sub_county_id: string
          ward_id: string
        }
        Insert: {
          active?: boolean
          balance?: string | null
          county_id: string
          created_at?: string
          id?: string
          name: string
          sub_county_id: string
          ward_id: string
        }
        Update: {
          active?: boolean
          balance?: string | null
          county_id?: string
          created_at?: string
          id?: string
          name?: string
          sub_county_id?: string
          ward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_sub_county_id_fkey"
            columns: ["sub_county_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          code: string | null
          created_at: string
          id: string
          phone_number: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          phone_number?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          phone_number?: string | null
        }
        Relationships: []
      }
      venues: {
        Row: {
          created_at: string
          id: string
          name: string | null
          ward_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          ward_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          constituency_id: string | null
          created_at: string
          id: string
          name: string
          sub_county: string | null
        }
        Insert: {
          constituency_id?: string | null
          created_at?: string
          id?: string
          name: string
          sub_county?: string | null
        }
        Update: {
          constituency_id?: string | null
          created_at?: string
          id?: string
          name?: string
          sub_county?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ward_constituency_id_fkey"
            columns: ["constituency_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wards_sub_county_fkey"
            columns: ["sub_county"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["name"]
          },
        ]
      }
      yellow_cards: {
        Row: {
          created_at: string
          id: string
          match_id: string | null
          player_id: string | null
          session: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          session?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string | null
          session?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yellow_cards_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellow_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yellow_cards_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
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
      user_types: "player" | "fan" | "sponsor" | "referee" | "news"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
