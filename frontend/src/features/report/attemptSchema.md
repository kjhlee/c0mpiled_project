# Attempt Schema Mapping

## Backend Schema (QuestionModel.java)

The backend returns attempts with the following structure based on `QuestionModel.java`:

```java
{
  id: String,
  question: String,
  difficulty: Difficulty,  // Enum: EASY, MEDIUM, HARD
  concepts: List<String>,
  hint1: String,
  hint1Used: Boolean,
  hint2: String,
  hint2Used: Boolean,
  hint3: String,
  hint3Used: Boolean,
  time: String  // Time spent (format: seconds or milliseconds as string)
}
```

**Note**: The attempt payload likely includes an additional `correct` or `correctness` boolean field indicating whether the answer was correct, even though it's not explicitly in QuestionModel.java. This is inferred from the requirement for correctness metrics.

## Frontend Normalized Schema (Attempt)

The frontend normalizes attempts to the following structure:

```javascript
{
  id: string,
  topic: string,              // From concepts[0] or "Unknown" if missing
  difficulty: "Easy" | "Medium" | "Hard",  // Normalized from EASY/MEDIUM/HARD
  correct: boolean,           // From correct/correctness field
  timeSpentSec: number      // From time field, converted to seconds
}
```

## Field Mappings

| Backend Field | Frontend Field | Transformation |
|--------------|----------------|----------------|
| `id` | `id` | Direct mapping |
| `concepts[0]` or `concepts` | `topic` | First concept, or "Unknown" if empty |
| `difficulty` (EASY/MEDIUM/HARD) | `difficulty` ("Easy"/"Medium"/"Hard") | Enum normalization |
| `correct` or `correctness` | `correct` | Direct mapping (boolean) |
| `time` (string, ms or sec) | `timeSpentSec` (number) | Parse and convert to seconds |

## Backend Field Names (Exact)

- `id`: string
- `difficulty`: "EASY" | "MEDIUM" | "HARD" (enum)
- `concepts`: string[] (array of concept strings)
- `time`: string (numeric string, may be milliseconds or seconds)
- `correct` or `correctness`: boolean (inferred, not in QuestionModel but required for metrics)

## Normalization Rules

1. **Difficulty**: Convert enum to title case
   - `EASY` → `"Easy"`
   - `MEDIUM` → `"Medium"`
   - `HARD` → `"Hard"`

2. **Topic**: Extract from `concepts` array
   - If `concepts` exists and has length > 0: use `concepts[0]`
   - Otherwise: default to `"Unknown"`

3. **Time**: Parse and normalize to seconds
   - If `time` is a string, parse as number
   - If value > 1000, assume milliseconds and divide by 1000
   - Otherwise, assume already in seconds
   - Result stored as `timeSpentSec` (number)

4. **Correctness**: Direct boolean mapping
   - Map `correct` or `correctness` field directly
   - If missing, default to `false`
