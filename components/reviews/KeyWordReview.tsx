import React from 'react';

interface KeyWordReviewProps {
  onSeasonSelect: (season: string) => void;
  onPersistenceSelect: (persistence: string) => void;
  onIntensitySelect: (intensity: string) => void;
  selectedSeason: string;
  selectedPersistence: string;
  selectedIntensity: string;
}

const KeyWordReview = ({
  onSeasonSelect,
  onPersistenceSelect,
  onIntensitySelect,
  selectedSeason,
  selectedPersistence,
  selectedIntensity,
}: KeyWordReviewProps) => {
  const seasons = ['봄', '여름', '가을', '겨울', '사계절'];
  const persistence = ['1시간', '3-4시간', '반나절', '하루종일'];
  const intensity = ['약함', '보통', '진함', '아주 진함'];

  return (
    <div className="mx-4">
      <div className="review-2 mb-5">키워드 리뷰</div>
      {/* Seasons */}
      <div className="flex overflow-x-auto mb-5 h-[30px]">
        <div className="flex w-[71px] items-center justify-start review-3">
          계절감
        </div>
        {seasons.map((season) => (
          <div key={season} className="form-radio-group overflow-auto-x">
            <input
              type="radio"
              id={`season-${season}`}
              name="season"
              className="form-radio"
              value={season}
              checked={selectedSeason === season}
              onChange={() => onSeasonSelect(season)}
            />
            <label
              htmlFor={`season-${season}`}
              className="form-radio-label body2 text-acodegray-700"
            >
              {season}
            </label>
          </div>
        ))}
      </div>
      {/* Persistence */}
      <div className="flex overflow-auto mb-5 h-[30px]">
        <div className="flex w-[71px] items-center justify-start review-3">
          지속성
        </div>
        {persistence.map((duration) => (
          <div key={duration} className="form-radio-group overflow-auto-x">
            <input
              type="radio"
              id={`persistence-${duration}`}
              name="persistence"
              className="form-radio"
              value={duration}
              checked={selectedPersistence === duration}
              onChange={() => onPersistenceSelect(duration)}
            />
            <label
              htmlFor={`persistence-${duration}`}
              className="form-radio-label body2"
            >
              {duration}
            </label>
          </div>
        ))}
      </div>
      {/* Intensity */}
      <div className="flex overflow-auto mb-5 h-[30px]">
        <div className="flex w-[71px] items-center justify-start review-3">
          향의 세기
        </div>
        {intensity.map((intensityLevel) => (
          <div
            key={intensityLevel}
            className="form-radio-group overflow-auto-x"
          >
            <input
              type="radio"
              id={`intensity-${intensityLevel}`}
              name="intensity"
              className="form-radio"
              value={intensityLevel}
              checked={selectedIntensity === intensityLevel}
              onChange={() => onIntensitySelect(intensityLevel)}
            />
            <label
              htmlFor={`intensity-${intensityLevel}`}
              className="form-radio-label body2"
            >
              {intensityLevel}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyWordReview;
