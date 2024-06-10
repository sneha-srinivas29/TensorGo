import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/dashboard');  // Redirect to frontend
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000');  // Redirect to frontend
  });
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

export default router;
