# Attempt Schema Mapping

## Backend Schema (Combined QuestionModel + SolutionModel)

The backend returns attempts that combine fields from both `QuestionModel.java` and `SolutionModel.java`:

### QuestionModel.java fields:
```java
{
  id: String,
  question: String,
  difficulty: Difficulty,  // Enum: EASY, MEDIUM, HARD
  concepts: List<String>,
  hint1: String,
  hint2: String,
  hint3: String
}
```

### SolutionModel.java fields:
```java
{
  id: String,
  solution: String,
  time: String,           // Time spent (format: seconds or milliseconds as string)
  correct: Boolean,       // Whether the answer was correct
  hint1used: Boolean,     // Note: lowercase field name
  hint2used: Boolean,     // Note: lowercase field name
  hint3used: Boolean      // Note: lowercase field name
}
```

### Combined Attempt Payload:
The `/questions/report` endpoint returns `{ role: RoleType, solutions: SolutionModel[] }`.
The frontend then fetches `/questions/by-role/{role}` to get questions and combines them with solutions to create attempts:
```java
{
  id: String,                    // From QuestionModel or SolutionModel
  question: String,              // From QuestionModel
  difficulty: Difficulty,        // From QuestionModel (EASY, MEDIUM, HARD)
  concepts: List<String>,       // From QuestionModel
  hint1: String,                // From QuestionModel
  hint2: String,                // From QuestionModel
  hint3: String,                // From QuestionModel
  solution: String,             // From SolutionModel (optional)
  time: String,                 // From SolutionModel
  correct: Boolean,             // From SolutionModel
  hint1used: Boolean,           // From SolutionModel (lowercase)
  hint2used: Boolean,           // From SolutionModel (lowercase)
  hint3used: Boolean            // From SolutionModel (lowercase)
}
```

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

**From QuestionModel:**
- `id`: string
- `question`: string
- `difficulty`: "EASY" | "MEDIUM" | "HARD" (enum)
- `concepts`: string[] (array of concept strings)
- `hint1`, `hint2`, `hint3`: string

**From SolutionModel:**
- `id`: string (may match QuestionModel id)
- `solution`: string (optional)
- `time`: string (numeric string, may be milliseconds or seconds)
- `correct`: boolean (required for metrics)
- `hint1used`, `hint2used`, `hint3used`: boolean (lowercase field names)

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
